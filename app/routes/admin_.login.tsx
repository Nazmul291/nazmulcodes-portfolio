import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { Shield, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { verifyCredentials, getClientIp } from '~/auth.server';
import { createAdminSession, isAuthenticated } from '~/session.server';
import { checkRateLimit, recordFailedAttempt, resetAttempts } from '~/models/rateLimit.server';
import { redirect } from '@remix-run/node';

import '~/styles/admin.css';

/**
 * Admin login route — sits OUTSIDE the admin layout so it's
 * accessible to unauthenticated users.
 */

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // If already logged in, redirect to dashboard
  const authed = await isAuthenticated(request);
  if (authed) throw redirect('/admin/dashboard');
  return null;
};

interface ActionData {
  error?: string;
  attemptsLeft?: number;
  blockedUntil?: string | null;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return json<ActionData>({ error: 'Username and password are required.' }, { status: 400 });
  }

  const ip = getClientIp(request);

  // Check if IP is currently rate-limited
  const rateStatus = await checkRateLimit(ip);
  if (rateStatus.blocked) {
    return json<ActionData>(
      {
        error: 'Too many failed attempts. Try again after 1 hour.',
        blockedUntil: rateStatus.blockedUntil,
        attemptsLeft: 0,
      },
      { status: 429 }
    );
  }

  // Verify credentials
  const valid = verifyCredentials(username, password);

  if (!valid) {
    const result = await recordFailedAttempt(ip);
    if (result.blocked) {
      return json<ActionData>(
        {
          error: 'Too many failed attempts. Your IP has been blocked for 1 hour.',
          blockedUntil: result.blockedUntil,
          attemptsLeft: 0,
        },
        { status: 429 }
      );
    }

    return json<ActionData>(
      {
        error: `Invalid credentials. ${result.attemptsLeft} attempt${result.attemptsLeft !== 1 ? 's' : ''} remaining.`,
        attemptsLeft: result.attemptsLeft,
      },
      { status: 401 }
    );
  }

  // Successful login — reset rate limit and create session
  await resetAttempts(ip);
  return createAdminSession('/admin/dashboard');
};

export default function AdminLogin() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={28} style={{ color: 'var(--accent-emerald)' }} />
          </div>
        </div>

        <h1 className="admin-login-title">Admin Access</h1>
        <p className="admin-login-subtitle">NazmulCodes Content Management</p>

        {actionData?.error && (
          <div className={`admin-alert ${actionData.blockedUntil ? 'admin-alert-warning' : 'admin-alert-error'}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={16} />
              <span>{actionData.error}</span>
            </div>
            {actionData.blockedUntil && (
              <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
                Blocked until: {new Date(actionData.blockedUntil).toLocaleTimeString()}
              </div>
            )}
          </div>
        )}

        <Form method="post">
          <div className="admin-field">
            <label className="admin-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="admin-input"
              autoComplete="username"
              required
              autoFocus
              disabled={!!actionData?.blockedUntil}
            />
          </div>

          <div className="admin-field">
            <label className="admin-label" htmlFor="password">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="admin-input"
                autoComplete="current-password"
                required
                disabled={!!actionData?.blockedUntil}
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 0,
                }}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || !!actionData?.blockedUntil}
            style={{
              width: '100%',
              marginTop: '0.5rem',
              padding: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              justifyContent: 'center',
            }}
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </Form>
      </div>
    </div>
  );
}
