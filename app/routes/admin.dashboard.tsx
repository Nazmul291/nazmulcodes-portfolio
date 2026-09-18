import { Link } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { FileText, Eye, FilePlus, PenTool } from 'lucide-react';
import { getPostStats, getAllPosts } from '~/models/blog.server';

export const loader = async () => {
  const [stats, allPosts] = await Promise.all([getPostStats(), getAllPosts()]);
  const recentPosts = allPosts.slice(0, 5);
  return json({ stats, recentPosts });
};

export default function AdminDashboard() {
  const { stats, recentPosts } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <Link to="/admin/blogs/new" className="btn btn-primary btn-sm">
          <FilePlus size={16} />
          <span>New Article</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.total}</div>
          <div className="admin-stat-label">Total Posts</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value" style={{ color: 'var(--accent-emerald)' }}>
            {stats.published}
          </div>
          <div className="admin-stat-label">Published</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value" style={{ color: 'var(--accent-amber)' }}>
            {stats.drafts}
          </div>
          <div className="admin-stat-label">Drafts</div>
        </div>
      </div>

      {/* Recent Posts */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0 }}>Recent Posts</h2>
          <Link to="/admin/blogs" className="admin-nav-link" style={{ fontSize: '0.85rem' }}>
            View All →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <PenTool size={32} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No articles yet.</p>
            <Link to="/admin/blogs/new" className="btn btn-primary btn-sm">
              Create Your First Article
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/admin/blogs/${post.id}/edit`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '0.85rem 1rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'border-color var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                  <FileText size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <span
                    style={{
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {post.title}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                  <span className={`admin-badge ${post.isPublished ? 'admin-badge-published' : 'admin-badge-draft'}`}>
                    {post.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
