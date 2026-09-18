import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData, Form } from '@remix-run/react';
import { FilePlus, Pencil, Trash2, Eye } from 'lucide-react';
import { getAllPosts, deletePost } from '~/models/blog.server';

export const loader = async () => {
  const posts = await getAllPosts();
  return json({ posts });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const postId = formData.get('postId') as string;

  if (intent === 'delete' && postId) {
    await deletePost(postId);
  }

  return redirect('/admin/blogs');
};

export default function AdminBlogsList() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Blog Posts ({posts.length})</h1>
        <Link to="/admin/blogs/new" className="btn btn-primary btn-sm">
          <FilePlus size={16} />
          <span>New Article</span>
        </Link>
      </div>

      {posts.length === 0 ? (
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
                <th>Title</th>
                <th>Status</th>
                <th>Category</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="admin-post-title-cell">{post.title}</td>
                  <td>
                    <span
                      className={`admin-badge ${post.isPublished ? 'admin-badge-published' : 'admin-badge-draft'}`}
                    >
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{post.category}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
