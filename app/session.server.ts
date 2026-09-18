import { createCookieSessionStorage, redirect } from '@remix-run/node';

/**
 * Secure cookie-based session storage for single-admin authentication.
 *
 * The cookie is HTTP-only, signed with SESSION_SECRET, and uses SameSite=Lax
 * to protect against CSRF while allowing normal navigation flows.
 */

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required');
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__admin_session',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    sameSite: 'lax',
    secrets: [SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

/** Retrieve the session object from the request cookie. */
export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get('Cookie'));
}

/** Create a new admin session and redirect to the dashboard. */
export async function createAdminSession(redirectTo: string = '/admin/dashboard') {
  const session = await sessionStorage.getSession();
  session.set('isAdmin', true);
  session.set('authenticatedAt', new Date().toISOString());

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

/** Destroy the admin session and redirect to the login page. */
export async function destroyAdminSession(request: Request) {
  const session = await getSession(request);
  return redirect('/admin/login', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

/**
 * Require an authenticated admin session.
 * Throws a redirect to /admin/login if the session is missing or invalid.
 */
export async function requireAdmin(request: Request): Promise<void> {
  const session = await getSession(request);
  const isAdmin = session.get('isAdmin');

  if (!isAdmin) {
    throw redirect('/admin/login');
  }
}

/** Check if the request has a valid admin session (non-throwing). */
export async function isAuthenticated(request: Request): Promise<boolean> {
  const session = await getSession(request);
  return session.get('isAdmin') === true;
}
