import type { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { findRedirect } from '~/models/redirect.server'; // আপনার ডাটাবেজ/Redis কোয়েরি ফাংশন

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const splatPath = params['*'] || '';

  // ১. স্লাগ স্যানিটাইজ করা (যেমন: blog/old-slug বা শুধু old-slug যাই আসুক)
  const cleanSlug = splatPath
    .replace(/^\/?blog\//, '')
    .replace(/^\/+|\/+$/g, '');

  // ২. ডাটাবেজ বা Redis-এ স্লাগটি খোঁজা
  const matchedRedirect = await findRedirect(cleanSlug);

  // ৩. মিল পাওয়া গেলে সরাসরি রিডাইরেক্ট করে দেওয়া
  if (matchedRedirect) {
    return redirect(matchedRedirect.targetUrl, {
      status: matchedRedirect.statusCode || 301,
      headers: {
        'Cache-Control': 'public, max-age=31536000', // ব্রাউজার ও সার্চ ইঞ্জিন ক্যাশ অপ্টিমাইজেশন
      },
    });
  }

  // ৪. ডাটাবেজেও কোনো রিডাইরেক্ট রুল না থাকলে আসল 404 থ্রো করা
  throw new Response('Not Found', { status: 404 });
};

// সাধারণ 404 UI পেজ
export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}