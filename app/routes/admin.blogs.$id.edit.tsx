import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { BlogEditor } from '~/components/BlogEditor';
import {
  getPostById,
  updatePost,
  isSlugTaken,
  getAdjacentAdminPosts,
} from '~/models/blog.server';
import type { ContentBlock } from '~/types/blog';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) throw new Response('Post ID required', { status: 400 });

  // Run both queries in parallel — adjacent posts query is cheap (2 indexed lookups).
  const [post, adjacentPosts] = await Promise.all([
    getPostById(id),
    getAdjacentAdminPosts(id),
  ]);

  if (!post) throw new Response('Post not found', { status: 404 });

  return json({ post, adjacentPosts });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id } = params;
  if (!id) throw new Response('Post ID required', { status: 400 });

  const formData = await request.formData();

  const title = (formData.get('title') as string || '').trim();
  const slug = (formData.get('slug') as string || '').trim();
  const excerpt = (formData.get('excerpt') as string || '').trim();
  const category = formData.get('category') as string || '';
  const tagsRaw = formData.get('tags') as string || '';
  const readTime = (formData.get('readTime') as string || '5 min read').trim();
  const coverImage = (formData.get('coverImage') as string || '').trim();
  const isPublished = formData.get('isPublished') === '1';
  const contentBlocksRaw = formData.get('contentBlocks') as string || '[]';

  // Validate required fields
  const errors: Record<string, string> = {};
  if (!title) errors.title = 'Title is required.';
  if (!slug) errors.slug = 'Slug is required.';
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.slug = 'Slug must be lowercase with hyphens only.';
  }
  if (slug && (await isSlugTaken(slug, id))) {
    errors.slug = 'This slug is already taken by another post.';
  }
  if (!excerpt) errors.excerpt = 'Excerpt is required.';

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  // Parse tags and content blocks
  const tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean);
  let contentBlocks: ContentBlock[];
  try {
    contentBlocks = JSON.parse(contentBlocksRaw);
  } catch {
    contentBlocks = [];
  }

  const updated = await updatePost({
    id,
    title,
    slug,
    excerpt,
    coverImage: coverImage || undefined,
    category,
    tags,
    readTime,
    isPublished,
    contentBlocks,
  });

  if (!updated) {
    return json({ errors: { title: 'Failed to update — post not found.' } }, { status: 404 });
  }

  return redirect('/admin/blogs');
};

export default function AdminBlogsEdit() {
  const { post, adjacentPosts } = useLoaderData<typeof loader>();
  const actionData = useActionData<{ errors?: Record<string, string> }>();

  return (
    <BlogEditor
      key={post.id}
      post={post}
      errors={actionData?.errors}
      adjacentPosts={adjacentPosts}
    />
  );
}

