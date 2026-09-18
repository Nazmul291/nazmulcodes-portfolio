import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { requireAdmin } from '~/session.server';
import { deletePost } from '~/models/blog.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAdmin(request);
  return redirect('/admin/blogs');
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  await requireAdmin(request);
  const { id } = params;
  if (id) {
    await deletePost(id);
  }
  return redirect('/admin/blogs');
};
