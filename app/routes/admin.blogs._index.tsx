import { useCallback, useEffect, useRef, useState } from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData, Form, useNavigation, useSearchParams } from '@remix-run/react';
import { FilePlus, Pencil, Trash2, Eye, Search, X, FilterX, TriangleAlert } from 'lucide-react';
import { getAdminPostList, getBlogCategories, getPostStats, deletePost } from '~/models/blog.server';
import { getWordCountTier, IN_DEPTH_MIN, THIN_CONTENT_MAX, type WordCountTier } from '~/utils/wordCount';

const STATUS_FILTERS = ['all', 'published', 'draft'] as const;
const WORD_COUNT_FILTERS = ['all', 'thin', 'borderline', 'in-depth', 'custom'] as const;

type StatusFilter = (typeof STATUS_FILTERS)[number];
type WordCountFilter = (typeof WORD_COUNT_FILTERS)[number];

const formatNumber = (n: number) => n.toLocaleString('en-US');

const WORD_COUNT_LABELS: Record<WordCountFilter, string> = {
  all: 'All Posts',
  thin: `Thin < ${formatNumber(THIN_CONTENT_MAX)}`,
  borderline: `Borderline ${formatNumber(THIN_CONTENT_MAX)}–${formatNumber(IN_DEPTH_MIN - 1)}`,
  'in-depth': `In-Depth ${formatNumber(IN_DEPTH_MIN)}+`,
  custom: 'Custom Range',
};

const TIER_TITLES: Record<WordCountTier, string> = {
  thin: 'Thin content: below AdSense-safe depth',
  borderline: 'Borderline: consider expanding',
  'in-depth': 'In-depth article',
};

function parseOption<T extends string>(value: string | null, options: readonly T[]): T {
  return options.includes(value as T) ? (value as T) : options[0];
}

function parseCount(value: string | null): number | null {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = new URL(request.url).searchParams;
  const q = params.get('q')?.trim() || undefined;
  const status = parseOption(params.get('status'), STATUS_FILTERS);
  const category = params.get('category') || undefined;
  const wordCount = parseOption(params.get('wordCount'), WORD_COUNT_FILTERS);
  const min = parseCount(params.get('min'));
  const max = parseCount(params.get('max'));

  const [matching, categories, { total }] = await Promise.all([
    getAdminPostList({ q, status: status === 'all' ? undefined : status, category }),
    getBlogCategories(),
    getPostStats(),
  ]);

  // Word count isn't a column, so this filter runs after the Prisma query; tier counts reflect the other active filters.
  const tierCounts: Record<WordCountTier, number> = { thin: 0, borderline: 0, 'in-depth': 0 };
  for (const post of matching) tierCounts[getWordCountTier(post.wordCount)]++;

  const posts = matching.filter((post) => {
    if (wordCount === 'all') return true;
    if (wordCount === 'custom') {
      return (min === null || post.wordCount >= min) && (max === null || post.wordCount <= max);
    }
    return getWordCountTier(post.wordCount) === wordCount;
  });

  return json({ posts, total, categories, tierCounts });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const postId = formData.get('postId') as string;

  if (intent === 'delete' && postId) {
    await deletePost(postId);
  }

  const url = new URL(request.url);
  url.searchParams.delete('index');
  return redirect(`/admin/blogs${url.search}`);
};

// Local input state with a debounced URL commit, so typing doesn't trigger a loader refetch per keystroke.
function useDebouncedParam(urlValue: string, commit: (value: string) => void, delay = 300) {
  const [value, setValue] = useState(urlValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const commitRef = useRef(commit);
  commitRef.current = commit;

  useEffect(() => {
    if (document.activeElement !== inputRef.current) setValue(urlValue);
  }, [urlValue]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const change = (next: string) => {
    setValue(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => commitRef.current(next), delay);
  };

  const cancel = () => clearTimeout(timer.current);

  return { value, setValue, change, cancel, inputRef };
}

export default function AdminBlogsList() {
  const { posts, total, categories, tierCounts } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const status = parseOption(searchParams.get('status'), STATUS_FILTERS);
  const wordCount = parseOption(searchParams.get('wordCount'), WORD_COUNT_FILTERS);
  const category = searchParams.get('category') ?? '';

  const updateParams = useCallback(
    (changes: Record<string, string>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [key, value] of Object.entries(changes)) {
            if (value && value !== 'all') next.set(key, value);
            else next.delete(key);
          }
          return next;
        },
        { replace: true, preventScrollReset: true }
      );
    },
    [setSearchParams]
  );

  const search = useDebouncedParam(searchParams.get('q') ?? '', (v) => updateParams({ q: v.trim() }));
  const minWords = useDebouncedParam(searchParams.get('min') ?? '', (v) => updateParams({ min: v }));
  const maxWords = useDebouncedParam(searchParams.get('max') ?? '', (v) => updateParams({ max: v }));

  const isFiltered = ['q', 'status', 'category', 'wordCount', 'min', 'max'].some((key) => searchParams.has(key));
  const isLoading = navigation.state === 'loading' && navigation.location.pathname === '/admin/blogs';

  const clearSearch = () => {
    search.cancel();
    search.setValue('');
    updateParams({ q: '' });
    search.inputRef.current?.focus();
  };

  const clearAll = () => {
    for (const field of [search, minWords, maxWords]) {
      field.cancel();
      field.setValue('');
    }
    setSearchParams(new URLSearchParams(), { replace: true, preventScrollReset: true });
  };

  const selectWordCount = (value: WordCountFilter) => {
    if (value === 'custom') {
      updateParams({ wordCount: value });
    } else {
      minWords.cancel();
      maxWords.cancel();
      updateParams({ wordCount: value, min: '', max: '' });
    }
  };

  if (total === 0) {
    return (
      <div>
        <div className="admin-page-header">
          <h1 className="admin-page-title">Blog Posts (0)</h1>
          <Link to="/admin/blogs/new" className="btn btn-primary btn-sm">
            <FilePlus size={16} />
            <span>New Article</span>
          </Link>
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1rem' }}>
            No blog posts yet. Create your first article!
          </p>
          <Link to="/admin/blogs/new" className="btn btn-primary btn-sm">
            <FilePlus size={16} />
            <span>Create Article</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">
          Blog Posts ({isFiltered ? `${posts.length} of ${total}` : total})
        </h1>
        <Link to="/admin/blogs/new" className="btn btn-primary btn-sm">
          <FilePlus size={16} />
          <span>New Article</span>
        </Link>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar-row">
          <div className="admin-search">
            <Search size={16} className="admin-search-icon" />
            <input
              ref={search.inputRef}
              type="search"
              className="admin-input"
              placeholder="Search by title or slug…"
              aria-label="Search posts by title or slug"
              value={search.value}
              onChange={(e) => search.change(e.target.value)}
            />
            {search.value && (
              <button type="button" className="admin-search-clear" onClick={clearSearch} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="admin-toolbar-group">
            <div className="admin-segmented" role="group" aria-label="Filter by status">
              {STATUS_FILTERS.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={status === value}
                  onClick={() => updateParams({ status: value })}
                >
                  {value === 'all' ? 'All' : value === 'published' ? 'Published' : 'Draft'}
                </button>
              ))}
            </div>

            <select
              className="admin-select admin-select-compact"
              aria-label="Filter by category"
              value={category}
              onChange={(e) => updateParams({ category: e.target.value })}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-toolbar-row">
          <div className="admin-toolbar-group">
            <div className="admin-segmented" role="group" aria-label="Filter by word count">
              {WORD_COUNT_FILTERS.map((value) => {
                const count = value === 'all' || value === 'custom' ? null : tierCounts[value];
                const warn = value === 'thin';
                return (
                  <button
                    key={value}
                    type="button"
                    className={warn ? 'is-warning' : undefined}
                    aria-pressed={wordCount === value}
                    onClick={() => selectWordCount(value)}
                  >
                    {warn && <TriangleAlert size={13} />}
                    <span>{WORD_COUNT_LABELS[value]}</span>
                    {count !== null && (
                      <span className={`admin-chip-count${warn && count > 0 ? ' is-warning' : ''}`}>{count}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {wordCount === 'custom' && (
              <div className="admin-range">
                <input
                  ref={minWords.inputRef}
                  type="number"
                  min={0}
                  step={50}
                  inputMode="numeric"
                  className="admin-input"
                  placeholder="Min"
                  aria-label="Minimum word count"
                  value={minWords.value}
                  onChange={(e) => minWords.change(e.target.value)}
                />
                <span>to</span>
                <input
                  ref={maxWords.inputRef}
                  type="number"
                  min={0}
                  step={50}
                  inputMode="numeric"
                  className="admin-input"
                  placeholder="Max"
                  aria-label="Maximum word count"
                  value={maxWords.value}
                  onChange={(e) => maxWords.change(e.target.value)}
                />
                <span>words</span>
              </div>
            )}
          </div>

          {isFiltered && (
            <button type="button" className="admin-filter-reset" onClick={clearAll}>
              <FilterX size={14} />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      <div className={`admin-posts-table-wrap${isLoading ? ' is-loading' : ''}`} aria-busy={isLoading}>
        <table className="admin-posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Category</th>
              <th>Word Count</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="admin-empty-filter">
                  <p style={{ marginBottom: '1rem' }}>No posts match these filters.</p>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={clearAll}>
                    <FilterX size={14} />
                    <span>Clear filters</span>
                  </button>
                </td>
              </tr>
            ) : (
              posts.map((post) => {
                const tier = getWordCountTier(post.wordCount);
                return (
                  <tr key={post.id}>
                    <td className="admin-post-title-cell" title={post.title}>
                      {post.title}
                    </td>
                    <td>
                      <span
                        className={`admin-badge ${post.isPublished ? 'admin-badge-published' : 'admin-badge-draft'}`}
                      >
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{post.category}</td>
                    <td>
                      <span className={`admin-wordcount admin-wordcount-${tier}`} title={TIER_TITLES[tier]}>
                        {formatNumber(post.wordCount)}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                        {post.isPublished && (
                          <Link
                            to={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-block-action-btn"
                            title="View on site"
                          >
                            <Eye size={16} />
                          </Link>
                        )}
                        <Link
                          to={`/admin/blogs/${post.id}/edit`}
                          className="admin-block-action-btn"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        <Form method="post" style={{ display: 'inline' }}>
                          <input type="hidden" name="intent" value="delete" />
                          <input type="hidden" name="postId" value={post.id} />
                          <button
                            type="submit"
                            className="admin-block-action-btn danger"
                            title="Delete"
                            onClick={(e) => {
                              if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </Form>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
