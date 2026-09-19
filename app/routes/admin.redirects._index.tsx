import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData, useActionData, useNavigation, Form } from '@remix-run/react';
import { useState } from 'react';
import { ArrowRight, CornerDownRight, Plus, Trash2, ExternalLink, ShieldCheck } from 'lucide-react';
import { getAllRedirects, createRedirect, deleteRedirect } from '~/models/redirect.server';

export const loader = async () => {
  const redirects = await getAllRedirects();
  return { redirects };
};

interface ActionData {
  error?: string;
  success?: boolean;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'create') {
    const rawSource = (formData.get('sourceSlug') as string || '').trim();
    const targetUrl = (formData.get('targetUrl') as string || '').trim();
    const statusCode = parseInt(formData.get('statusCode') as string || '301', 10);

    if (!rawSource) {
      return Response.json({ error: 'Source slug is required.' }, { status: 400 });
    }
    if (!targetUrl) {
      return Response.json({ error: 'Destination URL is required.' }, { status: 400 });
    }

    // 💡 সমাধান ১: /blog/ বা শুরুর কোনো স্ল্যাশ থাকলে তা কেটে শুধু ক্লিন স্লাগ রাখা
    const sourceSlug = rawSource
      .replace(/^\/?blog\//, '') // removes "/blog/" or "blog/" from start
      .replace(/^\/+/, '')       // removes leading slashes
      .replace(/\/+$/, '');      // removes trailing slashes

    await createRedirect({ sourceSlug, targetUrl, statusCode });
    return { success: true };
  }

  if (intent === 'delete') {
    const id = formData.get('id') as string;
    if (id) {
      await deleteRedirect(id);
    }
    return { success: true };
  }

  return redirect('/admin/redirects');
};

export default function AdminRedirectsList() {
  const { redirects } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">301 URL Redirects ({redirects.length})</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.25rem 0 0 0' }}>
            Prevent 404 errors and preserve Google SEO rank by permanently redirecting deleted or renamed slugs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>{showCreateForm ? 'Close Form' : 'New Redirect'}</span>
        </button>
      </div>

      {/* Quick explanation info box */}
      <div
        style={{
          background: 'rgba(16, 185, 129, 0.05)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
        }}
      >
        <ShieldCheck size={20} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong>Google SEO Preservation:</strong> When a blog post is deleted or its slug is changed, Google bots and users hitting the old URL will be given an immediate <strong>HTTP 301 Permanent Redirect</strong> to the destination. Upstash Redis caches these lookups so redirection takes ~10ms with zero database load.
        </div>
      </div>

      {/* New Redirect Form Card */}
      {showCreateForm && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 1rem 0' }}>
            Create New 301 Redirect
          </h2>

          {actionData?.error && (
            <div className="admin-alert admin-alert-error" style={{ marginBottom: '1rem' }}>
              {actionData.error}
            </div>
          )}

          <Form method="post" onSubmit={() => setShowCreateForm(false)}>
            <input type="hidden" name="intent" value="create" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div className="admin-field" style={{ margin: 0 }}>
                <label className="admin-label" htmlFor="sourceSlug">
                  Old / Deleted Slug <span style={{ color: 'var(--accent-amber)' }}>*</span>
                </label>
                <input
                  id="sourceSlug"
                  name="sourceSlug"
                  type="text"
                  placeholder="e.g. old-guide-slug"
                  className="admin-input"
                  required
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  The pure slug without prefix (e.g. old-post-name).
                </span>
              </div>

              <div className="admin-field" style={{ margin: 0 }}>
                <label className="admin-label" htmlFor="targetUrl">
                  Destination Target URL <span style={{ color: 'var(--accent-amber)' }}>*</span>
                </label>
                <input
                  id="targetUrl"
                  name="targetUrl"
                  type="text"
                  placeholder="e.g. /blog/new-article-slug"
                  className="admin-input"
                  required
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  Where the visitor / crawler should be redirected to.
                </span>
              </div>

              <div className="admin-field" style={{ margin: 0 }}>
                <label className="admin-label" htmlFor="statusCode">
                  Redirect Type
                </label>
                <select id="statusCode" name="statusCode" className="admin-input" defaultValue="301">
                  <option value="301">301 — Permanent (Transfers SEO Ranking)</option>
                  <option value="302">302 — Temporary (Does not transfer rank)</option>
                </select>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  Always use 301 for deleted or renamed content.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-sm"
              >
                {isSubmitting ? 'Saving...' : 'Save & Activate Redirect'}
              </button>
            </div>
          </Form>
        </div>
      )}

      {/* Redirects List Table */}
      {redirects.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <CornerDownRight size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1rem' }}>
            No redirects created yet. All healthy URLs will render directly.
          </p>
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Add First Redirect</span>
          </button>
        </div>
      ) : (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}
        >
          <table className="admin-posts-table">
            <thead>
              <tr>
                <th>Source Slug (From)</th>
                <th>Destination (To)</th>
                <th>Status</th>
                <th>Created</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {redirects.map((r) => (
                <tr key={r.id}>
                  {/* 💡 সমাধান ২: /blog/ সরিয়ে সরাসরি r.sourceSlug দেখানো হচ্ছে */}
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {r.sourceSlug}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-emerald)' }}>
                      <ArrowRight size={14} />
                      <span>{r.targetUrl}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="admin-badge"
                      style={{
                        background: r.statusCode === 301 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: r.statusCode === 301 ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                        border: `1px solid ${r.statusCode === 301 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                      }}
                    >
                      {r.statusCode} {r.statusCode === 301 ? 'Permanent' : 'Temporary'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    {new Date(r.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                      {/* টেস্ট করার জন্য সরাসরি স্লাগে যাবে */}
                      <Link
                        to={`/${r.sourceSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-block-action-btn"
                        title="Test redirect in new tab"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <Form method="post" style={{ display: 'inline' }}>
                        <input type="hidden" name="intent" value="delete" />
                        <input type="hidden" name="id" value={r.id} />
                        <button
                          type="submit"
                          className="admin-block-action-btn danger"
                          title="Delete redirect"
                          onClick={(e) => {
                            if (!confirm(`Delete redirect for "${r.sourceSlug}"?`)) {
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}