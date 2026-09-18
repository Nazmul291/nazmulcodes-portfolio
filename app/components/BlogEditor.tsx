import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Form, useNavigation, Link, useNavigate } from '@remix-run/react';
import {
  Plus,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Type,
  AlignLeft,
  Code,
  AlertCircle,
  Image,
  List,
  ArrowLeft,
  Save,
  Eye,
} from 'lucide-react';
import type { ContentBlock, DbBlogPost } from '~/types/blog';
import type { AdjacentAdminPost } from '~/models/blog.server';

/**
 * Visual block-builder form for creating and editing blog posts.
 *
 * Manages block state client-side via React useState, serializes the blocks
 * array to a hidden JSON field on submission, and exposes a sticky action bar
 * with reactive dirty-state tracking and "Save Now" / "Preview Now" CTAs.
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Shopify & E-Commerce',
  'Performance & Web Vitals',
  'React & Frontend',
  'Full-Stack & APIs',
  'Freelancing & Career',
  'Founder Journey',
];

const CODE_LANGUAGES = [
  'typescript', 'javascript', 'html', 'css', 'liquid', 'json',
  'bash', 'sql', 'graphql', 'python', 'yaml', 'markdown',
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogEditorProps {
  /** Existing post when editing; undefined when creating a new post. */
  post?: DbBlogPost;
  /** Server-side validation errors from the Remix action. */
  errors?: Record<string, string>;
  /**
   * Previous and next posts for in-editor navigation.
   * Only present when editing an existing post (not on the "new" route).
   */
  adjacentPosts?: {
    prev: AdjacentAdminPost | null;
    next: AdjacentAdminPost | null;
  };
}

/** Stable snapshot of all form values used for dirty-state comparison. */
interface FormSnapshot {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string;
  coverImage: string;
  readTime: string;
  isPublished: boolean;
  /** JSON-serialised content blocks for deep equality. */
  blocksJson: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

function buildSnapshot(
  values: Omit<FormSnapshot, 'blocksJson'> & { blocks: ContentBlock[] }
): FormSnapshot {
  return {
    title: values.title,
    slug: values.slug,
    excerpt: values.excerpt,
    category: values.category,
    tags: values.tags,
    coverImage: values.coverImage,
    readTime: values.readTime,
    isPublished: values.isPublished,
    blocksJson: JSON.stringify(values.blocks),
  };
}

function snapshotsEqual(a: FormSnapshot, b: FormSnapshot): boolean {
  return (
    a.title === b.title &&
    a.slug === b.slug &&
    a.excerpt === b.excerpt &&
    a.category === b.category &&
    a.tags === b.tags &&
    a.coverImage === b.coverImage &&
    a.readTime === b.readTime &&
    a.isPublished === b.isPublished &&
    a.blocksJson === b.blocksJson
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BlogEditor({ post, errors, adjacentPosts }: BlogEditorProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';

  // ── Metadata state ────────────────────────────────────────────────────────
  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!post);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [category, setCategory] = useState(post?.category ?? CATEGORIES[0]);
  const [tags, setTags] = useState(post?.tags.join(', ') ?? '');
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? '');
  const [readTime, setReadTime] = useState(post?.readTime ?? '5 min read');
  const [isPublished, setIsPublished] = useState(post?.isPublished ?? false);

  // ── Block state ───────────────────────────────────────────────────────────
  const [blocks, setBlocks] = useState<ContentBlock[]>(post?.contentBlocks ?? []);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // ── Dirty-state tracking ─────────────────────────────────────────────────
  /**
   * The initial snapshot is computed once from the post prop and stored in a
   * ref so it stays stable across renders without triggering effects.
   */
  const initialSnapshot = useRef<FormSnapshot>(
    buildSnapshot({
      title: post?.title ?? '',
      slug: post?.slug ?? '',
      excerpt: post?.excerpt ?? '',
      category: post?.category ?? CATEGORIES[0],
      tags: post?.tags.join(', ') ?? '',
      coverImage: post?.coverImage ?? '',
      readTime: post?.readTime ?? '5 min read',
      isPublished: post?.isPublished ?? false,
      blocks: post?.contentBlocks ?? [],
    })
  );

  /** Live snapshot recomputed on every render — cheap string comparisons. */
  const currentSnapshot = useMemo<FormSnapshot>(
    () => buildSnapshot({ title, slug, excerpt, category, tags, coverImage, readTime, isPublished, blocks }),
    [title, slug, excerpt, category, tags, coverImage, readTime, isPublished, blocks]
  );

  const isDirty = !snapshotsEqual(initialSnapshot.current, currentSnapshot);

  /**
   * After a successful save the Remix action redirects (edit) or stays (new).
   * Track the submitting → idle transition to reset the dirty baseline so the
   * Save button becomes disabled again after a round-trip that doesn't redirect.
   */
  const wasSubmitting = useRef(false);
  useEffect(() => {
    if (isSubmitting) {
      wasSubmitting.current = true;
    } else if (wasSubmitting.current) {
      wasSubmitting.current = false;
      // Reset the baseline to whatever state the server just accepted.
      initialSnapshot.current = currentSnapshot;
    }
  }, [isSubmitting, currentSnapshot]);

  // ── Auto-generate slug from title ─────────────────────────────────────────
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(slugify(value));
    }
  };

  // ── Block manipulation ────────────────────────────────────────────────────
  const addBlock = useCallback((type: ContentBlock['type']) => {
    let newBlock: ContentBlock;
    switch (type) {
      case 'heading':
        newBlock = { type: 'heading', level: 2, text: '' };
        break;
      case 'paragraph':
        newBlock = { type: 'paragraph', text: '' };
        break;
      case 'code':
        newBlock = { type: 'code', language: 'typescript', code: '', filename: '' };
        break;
      case 'callout':
        newBlock = { type: 'callout', variant: 'tip', text: '' };
        break;
      case 'image':
        newBlock = { type: 'image', url: '', alt: '', caption: '' };
        break;
      case 'list':
        newBlock = { type: 'list', style: 'bullet', items: [''] };
        break;
      default:
        return;
    }
    setBlocks((prev) => [...prev, newBlock]);
    setShowAddMenu(false);
  }, []);

  const updateBlock = useCallback((index: number, updated: ContentBlock) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? updated : b)));
  }, []);

  const removeBlock = useCallback((index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const moveBlock = useCallback((index: number, direction: -1 | 1) => {
    setBlocks((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  // ── Preview handler ───────────────────────────────────────────────────────
  const handlePreview = () => {
    if (post?.slug && typeof window !== 'undefined') {
      window.open(`/blog/${post.slug}`, '_blank', 'noopener,noreferrer');
    }
  };

  // ── Adjacent-post navigation (dirty-guarded) ──────────────────────────────
  /**
   * Navigate to a Prev/Next post, but first confirm if the form is dirty.
   * Using window.confirm keeps the implementation zero-dependency and avoids
   * the need for a custom modal component.
   */
  const handleAdjacentNav = useCallback(
    (targetId: string) => {
      if (
        isDirty &&
        typeof window !== 'undefined' &&
        !window.confirm(
          'You have unsaved changes.\nAre you sure you want to navigate away? Your changes will be lost.'
        )
      ) {
        return; // User cancelled — stay on the current page.
      }
      navigate(`/admin/blogs/${targetId}/edit`);
    },
    [isDirty, navigate]
  );

  // ── Derived values ────────────────────────────────────────────────────────
  const canPreview = Boolean(post?.slug);
  const previewTitle = !canPreview
    ? 'Save the post first to enable preview'
    : isDirty
    ? 'You have unsaved changes — save first to preview the latest version'
    : `Open /blog/${post!.slug} in a new tab`;

  const prevPost = adjacentPosts?.prev ?? null;
  const nextPost = adjacentPosts?.next ?? null;
  const hasPrev = Boolean(prevPost);
  const hasNext = Boolean(nextPost);

  /** Human-readable tooltip for a Prev/Next button. */
  const adjButtonTitle = (adj: AdjacentAdminPost | null, dir: 'Previous' | 'Next'): string => {
    if (!adj) return `No ${dir.toLowerCase()} post`;
    const status = adj.isPublished ? 'Published' : 'Draft';
    return `${dir}: ${adj.title} (${status})${isDirty ? ' — save changes first' : ''}`;
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <Form method="post">
      {/* Hidden JSON fields */}
      <input type="hidden" name="contentBlocks" value={JSON.stringify(blocks)} />
      <input type="hidden" name="tags" value={tags} />
      <input type="hidden" name="isPublished" value={isPublished ? '1' : '0'} />

      {/* ─── Sticky Action Bar ──────────────────────────────────────────────
          • position: sticky; top: var(--admin-topbar-h, 65px)
            snaps flush below the admin topbar (z-index: 100) with no overlap.
          • z-index: 40 — below topbar (100) but above all editor content.
          • margin bleed (-2rem left/right/-2rem top) escapes .admin-content
            padding so the bar spans the full viewport width visually.
          • backdrop-filter frosted glass — theme-adaptive via CSS variables.
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="editor-action-bar" role="toolbar" aria-label="Article editor actions">

        {/* LEFT: Back nav · Prev/Next · Status badge · Unsaved-changes label */}
        <div className="editor-action-bar-left">
          <Link
            to="/admin/blogs"
            className="admin-block-action-btn"
            title="Back to all posts"
            style={{
              width: 'auto',
              padding: '0.3rem 0.65rem',
              gap: '0.35rem',
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '0.82rem',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} />
            <span style={{ whiteSpace: 'nowrap' }}>Back to Posts</span>
          </Link>

          {/* Prev / Next post navigation — only shown when editing an existing post */}
          {adjacentPosts !== undefined && (
            <>
              {/* Divider */}
              <span
                aria-hidden="true"
                style={{
                  width: '1px',
                  height: '20px',
                  background: 'var(--border-medium)',
                  flexShrink: 0,
                }}
              />

              {/* ← Prev */}
              <button
                type="button"
                onClick={() => prevPost && handleAdjacentNav(prevPost.id)}
                disabled={!hasPrev}
                aria-disabled={!hasPrev}
                title={adjButtonTitle(prevPost, 'Previous')}
                className="admin-block-action-btn"
                style={{
                  width: 'auto',
                  padding: '0.3rem 0.6rem',
                  gap: '0.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  opacity: hasPrev ? 1 : 0.35,
                  cursor: hasPrev ? 'pointer' : 'not-allowed',
                  pointerEvents: hasPrev ? 'auto' : 'none',
                }}
              >
                <ChevronLeft size={13} />
                <span style={{ whiteSpace: 'nowrap' }}>Prev</span>
              </button>

              {/* Next → */}
              <button
                type="button"
                onClick={() => nextPost && handleAdjacentNav(nextPost.id)}
                disabled={!hasNext}
                aria-disabled={!hasNext}
                title={adjButtonTitle(nextPost, 'Next')}
                className="admin-block-action-btn"
                style={{
                  width: 'auto',
                  padding: '0.3rem 0.6rem',
                  gap: '0.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  opacity: hasNext ? 1 : 0.35,
                  cursor: hasNext ? 'pointer' : 'not-allowed',
                  pointerEvents: hasNext ? 'auto' : 'none',
                }}
              >
                <span style={{ whiteSpace: 'nowrap' }}>Next</span>
                <ChevronRight size={13} />
              </button>

              {/* Divider */}
              <span
                aria-hidden="true"
                style={{
                  width: '1px',
                  height: '20px',
                  background: 'var(--border-medium)',
                  flexShrink: 0,
                }}
              />
            </>
          )}

          {/* Real-time publish status — updates immediately when toggle is flipped */}
          <span
            className={`admin-badge ${isPublished ? 'admin-badge-published' : 'admin-badge-draft'}`}
            title={isPublished ? 'Publicly visible' : 'Draft — not visible to the public'}
          >
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isPublished ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                flexShrink: 0,
              }}
            />
            {isPublished ? 'Published' : 'Draft'}
          </span>

          {/* Inline "Unsaved changes" label — only shows when form is dirty */}
          {isDirty && !isSubmitting && (
            <span
              aria-live="polite"
              style={{
                fontSize: '0.75rem',
                color: 'var(--accent-amber)',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'currentColor',
                  flexShrink: 0,
                }}
              />
              Unsaved changes
            </span>
          )}
        </div>

        {/* RIGHT: Preview Now · Save Now */}
        <div className="editor-action-bar-right">

          {/* Preview Now — disabled for brand-new posts without a persisted slug */}
          <button
            type="button"
            onClick={handlePreview}
            disabled={!canPreview}
            aria-disabled={!canPreview}
            title={previewTitle}
            className="btn btn-secondary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              opacity: canPreview ? 1 : 0.38,
              cursor: canPreview ? 'pointer' : 'not-allowed',
              pointerEvents: canPreview ? 'auto' : 'none',
              position: 'relative',
            }}
          >
            <Eye size={14} />
            <span>Preview</span>
            {/* Amber pulse dot: warns that the preview shows stale (pre-save) content */}
            {canPreview && isDirty && (
              <span className="editor-preview-warning-dot" aria-hidden="true" />
            )}
          </button>

          {/* Save Now — disabled when clean, active when dirty, spinner while submitting */}
          <button
            type="submit"
            disabled={!isDirty || isSubmitting}
            aria-disabled={!isDirty || isSubmitting}
            className="btn btn-primary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              opacity: (!isDirty && !isSubmitting) ? 0.42 : 1,
              cursor: (!isDirty && !isSubmitting) ? 'not-allowed' : 'pointer',
              pointerEvents: (!isDirty && !isSubmitting) ? 'none' : 'auto',
              minWidth: '108px',
              justifyContent: 'center',
              transition: 'opacity 150ms ease',
            }}
          >
            {isSubmitting ? (
              <>
                <span className="editor-save-spinner" aria-hidden="true" />
                <span>Saving…</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Save Now</span>
              </>
            )}
          </button>
        </div>
      </div>
      {/* ─── End Sticky Action Bar ─────────────────────────────────────────── */}

      {/* ─── Metadata Section ────────────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: 0, marginBottom: '1.25rem' }}>
          Article Metadata
        </h2>

        <div className="admin-field">
          <label className="admin-label" htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className="admin-input"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            placeholder="Your article title..."
          />
          {errors?.title && <span style={{ color: 'var(--accent-rose)', fontSize: '0.82rem' }}>{errors.title}</span>}
        </div>

        <div className="admin-field">
          <label className="admin-label" htmlFor="slug">
            Slug
            <span style={{ fontWeight: 400, textTransform: 'none', marginLeft: '0.5rem', color: 'var(--text-muted)' }}>
              (URL path)
            </span>
          </label>
          <input
            id="slug"
            name="slug"
            className="admin-input"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugManuallyEdited(true);
            }}
            required
            placeholder="your-article-slug"
          />
          {errors?.slug && <span style={{ color: 'var(--accent-rose)', fontSize: '0.82rem' }}>{errors.slug}</span>}
        </div>

        <div className="admin-field">
          <label className="admin-label" htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            className="admin-textarea"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            rows={3}
            placeholder="Brief article summary for search engines and blog cards..."
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-field">
            <label className="admin-label" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="admin-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="admin-field">
            <label className="admin-label" htmlFor="readTime">Read Time</label>
            <input
              id="readTime"
              name="readTime"
              className="admin-input"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="7 min read"
            />
          </div>
        </div>

        <div className="admin-field">
          <label className="admin-label" htmlFor="tagsDisplay">
            Tags
            <span style={{ fontWeight: 400, textTransform: 'none', marginLeft: '0.5rem', color: 'var(--text-muted)' }}>
              (comma-separated)
            </span>
          </label>
          <input
            id="tagsDisplay"
            className="admin-input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="React, TypeScript, Performance..."
          />
        </div>

        <div className="admin-field">
          <label className="admin-label" htmlFor="coverImage">Cover Image URL (optional)</label>
          <input
            id="coverImage"
            name="coverImage"
            className="admin-input"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://example.com/image.webp"
          />
        </div>

        <div className="admin-toggle-row">
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              Publish Immediately
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {isPublished
                ? 'This article will be visible on the public blog.'
                : 'Saved as draft — not visible to the public.'}
            </div>
          </div>
          <label className="admin-toggle">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <span className="admin-toggle-slider" />
          </label>
        </div>
      </div>

      {/* ─── Block Builder Section ────────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
            Content Blocks ({blocks.length})
          </h2>
        </div>

        {/* Blocks list */}
        {blocks.map((block, index) => (
          <div key={index} className="admin-block-card">
            <div className="admin-block-header">
              <span className="admin-block-type-badge">{block.type}</span>
              <div className="admin-block-actions">
                <button type="button" className="admin-block-action-btn" onClick={() => moveBlock(index, -1)} disabled={index === 0} title="Move up">
                  <ChevronUp size={16} />
                </button>
                <button type="button" className="admin-block-action-btn" onClick={() => moveBlock(index, 1)} disabled={index === blocks.length - 1} title="Move down">
                  <ChevronDown size={16} />
                </button>
                <button type="button" className="admin-block-action-btn danger" onClick={() => removeBlock(index)} title="Delete block">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Type-specific editors */}
            {block.type === 'heading' && (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <select
                  className="admin-select"
                  value={block.level}
                  onChange={(e) => updateBlock(index, { ...block, level: Number(e.target.value) as 1 | 2 | 3 | 4 })}
                  style={{ width: '100px', flexShrink: 0 }}
                >
                  <option value={1}>H1</option>
                  <option value={2}>H2</option>
                  <option value={3}>H3</option>
                  <option value={4}>H4</option>
                </select>
                <input
                  className="admin-input"
                  value={block.text}
                  onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                  placeholder="Heading text..."
                />
              </div>
            )}

            {block.type === 'paragraph' && (
              <textarea
                className="admin-textarea"
                value={block.text}
                onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                placeholder="Write your paragraph..."
                rows={4}
              />
            )}

            {block.type === 'code' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <select
                    className="admin-select"
                    value={block.language}
                    onChange={(e) => updateBlock(index, { ...block, language: e.target.value })}
                    style={{ width: '150px' }}
                  >
                    {CODE_LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <input
                    className="admin-input"
                    value={block.filename || ''}
                    onChange={(e) => updateBlock(index, { ...block, filename: e.target.value })}
                    placeholder="filename.ts (optional)"
                  />
                </div>
                <textarea
                  className="admin-textarea admin-textarea-code"
                  value={block.code}
                  onChange={(e) => updateBlock(index, { ...block, code: e.target.value })}
                  placeholder="Paste your code..."
                  rows={6}
                />
              </div>
            )}

            {block.type === 'callout' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <select
                  className="admin-select"
                  value={block.variant}
                  onChange={(e) => updateBlock(index, { ...block, variant: e.target.value as 'info' | 'warning' | 'tip' })}
                  style={{ width: '150px' }}
                >
                  <option value="info">ℹ️ Info</option>
                  <option value="warning">⚠️ Warning</option>
                  <option value="tip">💡 Pro Tip</option>
                </select>
                <textarea
                  className="admin-textarea"
                  value={block.text}
                  onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                  placeholder="Callout message..."
                  rows={3}
                />
              </div>
            )}

            {block.type === 'image' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                  className="admin-input"
                  value={block.url}
                  onChange={(e) => updateBlock(index, { ...block, url: e.target.value })}
                  placeholder="Image URL..."
                />
                <input
                  className="admin-input"
                  value={block.alt}
                  onChange={(e) => updateBlock(index, { ...block, alt: e.target.value })}
                  placeholder="Alt text (for accessibility)..."
                />
                <input
                  className="admin-input"
                  value={block.caption || ''}
                  onChange={(e) => updateBlock(index, { ...block, caption: e.target.value })}
                  placeholder="Caption (optional)..."
                />
                {block.url && (
                  <img
                    src={block.url}
                    alt={block.alt || 'Preview'}
                    style={{
                      maxHeight: '200px',
                      objectFit: 'contain',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-tertiary)',
                    }}
                  />
                )}
              </div>
            )}

            {block.type === 'list' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <select
                  className="admin-select"
                  value={block.style}
                  onChange={(e) => updateBlock(index, { ...block, style: e.target.value as 'bullet' | 'ordered' })}
                  style={{ width: '150px' }}
                >
                  <option value="bullet">• Bullet</option>
                  <option value="ordered">1. Ordered</option>
                </select>
                {block.items.map((item, itemIdx) => (
                  <div key={itemIdx} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      className="admin-input"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...block.items];
                        newItems[itemIdx] = e.target.value;
                        updateBlock(index, { ...block, items: newItems });
                      }}
                      placeholder={`Item ${itemIdx + 1}...`}
                    />
                    <button
                      type="button"
                      className="admin-block-action-btn danger"
                      onClick={() => {
                        const newItems = block.items.filter((_, i) => i !== itemIdx);
                        updateBlock(index, { ...block, items: newItems.length ? newItems : [''] });
                      }}
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => updateBlock(index, { ...block, items: [...block.items, ''] })}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <Plus size={14} />
                  <span>Add Item</span>
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add Block Button */}
        <div style={{ position: 'relative', marginTop: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowAddMenu(!showAddMenu)}
            style={{
              width: '100%',
              padding: '0.85rem',
              justifyContent: 'center',
              border: '2px dashed var(--border-medium)',
              background: 'transparent',
            }}
          >
            <Plus size={18} />
            <span>Add Content Block</span>
          </button>

          {showAddMenu && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: '0.5rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                padding: '0.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.35rem',
                zIndex: 50,
                boxShadow: 'var(--shadow-lg)',
                minWidth: '320px',
              }}
            >
              {([
                { type: 'heading' as const, icon: <Type size={14} />, label: 'Heading' },
                { type: 'paragraph' as const, icon: <AlignLeft size={14} />, label: 'Paragraph' },
                { type: 'code' as const, icon: <Code size={14} />, label: 'Code' },
                { type: 'callout' as const, icon: <AlertCircle size={14} />, label: 'Callout' },
                { type: 'image' as const, icon: <Image size={14} />, label: 'Image' },
                { type: 'list' as const, icon: <List size={14} />, label: 'List' },
              ] as const).map(({ type, icon, label }) => (
                <button
                  key={type}
                  type="button"
                  className="admin-nav-link"
                  onClick={() => addBlock(type)}
                  style={{ flex: '1 0 45%' }}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Footer hint ─────────────────────────────────────────────────── */}
      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', paddingBottom: '1.5rem' }}>
        Use the <strong>Save Now</strong> button in the sticky bar above to persist your changes.
      </p>
    </Form>
  );
}
