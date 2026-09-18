import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, Link, useLocation } from '@remix-run/react';
import { LayoutDashboard, FileText, LogOut, Home } from 'lucide-react';
import { requireAdmin, destroyAdminSession } from '~/session.server';

import '~/styles/admin.css';

/**
 * Admin layout route.
 *
 * All /admin/* child routes are protected by the requireAdmin check
 * in the loader. Unauthenticated requests are redirected to /admin/login.
 *
 * The login route itself is excluded from this protection because
 * Remix renders the login route OUTSIDE this layout (it's admin.login,
 * not admin._index or admin.dashboard).
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname.startsWith('/admin/login')) {
    return null;
  }
  await requireAdmin(request);
  return null;
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  // Handle logout POST action
  return destroyAdminSession(request);
};

export default function AdminLayout() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="admin-layout">
      <header className="admin-topbar">
        <Link to="/admin/dashboard" className="admin-topbar-brand">
          <LayoutDashboard size={20} style={{ color: 'var(--accent-emerald)' }} />
          <span>NazmulCodes Admin</span>
        </Link>

        <nav className="admin-topbar-nav">
          <Link
            to="/admin/dashboard"
            className={`admin-nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/blogs"
            className={`admin-nav-link ${isActive('/admin/blogs') ? 'active' : ''}`}
          >
            <FileText size={16} />
            <span>Blog Posts</span>
          </Link>
          <Link
            to="/"
            className="admin-nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Home size={16} />
            <span>View Site</span>
          </Link>
          <form method="post" style={{ display: 'inline' }}>
            <button
              type="submit"
              className="admin-nav-link"
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </form>
        </nav>
      </header>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
