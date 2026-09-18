import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@remix-run/react';
import { BlogEditor } from '~/components/BlogEditor';
import { createPost, isSlugTaken } from '~/models/blog.server';
import type { ContentBlock } from '~/types/blog';

export const action = async ({ request }: ActionFunctionArgs) => {
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
  if (slug && (await isSlugTaken(slug))) {
    errors.slug = 'This slug is already taken.';
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

  await createPost({
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

  return redirect('/admin/blogs');
};

export default function AdminBlogsNew() {
  const actionData = useActionData<{ errors?: Record<string, string> }>();

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/admin/blogs" className="admin-block-action-btn" title="Back to list">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="admin-page-title">Create New Article</h1>
        </div>
      </div>

      <BlogEditor errors={actionData?.errors} />
    </div>
  );
}
