import { prisma } from '../app/db.server';
import { blogPosts } from '../app/data/blogPosts';
import type { BlogPost, ContentBlock } from '../app/types/blog';

/**
 * Migration & Seed Script:
 * Reads static blog posts from app/data/blogPosts.ts and seeds them
 * into PostgreSQL via Prisma as published posts with modern ContentBlock[] structures.
 */

function convertPostToBlocks(post: BlogPost): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  // 1. Learning outcomes (if any)
  if (post.learningOutcomes && post.learningOutcomes.length > 0) {
    blocks.push({
      type: 'callout',
      variant: 'info',
      text: 'Key takeaways in this guide:\n' + post.learningOutcomes.map((item) => `• ${item}`).join('\n'),
    });
  }

  // 2. Introduction paragraphs
  if (post.introduction) {
    const introParagraphs = post.introduction
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    for (const text of introParagraphs) {
      blocks.push({ type: 'paragraph', text });
    }
  }

  // 3. Sections
  if (post.sections && Array.isArray(post.sections)) {
    for (const section of post.sections) {
      if (section.heading) {
        blocks.push({
          type: 'heading',
          level: 2,
          text: section.heading,
        });
      }

      if (section.content) {
        const chunks = section.content.split('\n\n').map((c) => c.trim()).filter(Boolean);
        for (const chunk of chunks) {
          if (chunk.startsWith('### ')) {
            blocks.push({
              type: 'heading',
              level: 3,
              text: chunk.replace(/^###\s+/, '').trim(),
            });
          } else if (chunk.startsWith('- ') || chunk.startsWith('* ')) {
            const items = chunk
              .split('\n')
              .map((line) => line.replace(/^[-*]\s+/, '').trim())
              .filter(Boolean);
            blocks.push({
              type: 'list',
              style: 'bullet',
              items,
            });
          } else {
            blocks.push({
              type: 'paragraph',
              text: chunk,
            });
          }
        }
      }

      if (section.codeSnippet && section.codeSnippet.code) {
        blocks.push({
          type: 'code',
          language: section.codeSnippet.language || 'typescript',
          code: section.codeSnippet.code,
          filename: section.codeSnippet.filename,
        });

        if (section.codeSnippet.explanation) {
          blocks.push({
            type: 'paragraph',
            text: section.codeSnippet.explanation,
          });
        }
      }

      if (section.tip) {
        blocks.push({
          type: 'callout',
          variant: 'tip',
          text: section.tip,
        });
      }
    }
  }

  // 4. Conclusion
  if (post.conclusion) {
    blocks.push({
      type: 'heading',
      level: 2,
      text: 'Summary & Key Conclusion',
    });

    const concParagraphs = post.conclusion
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    for (const text of concParagraphs) {
      blocks.push({ type: 'paragraph', text });
    }
  }

  // 5. FAQs
  if (post.faqs && Array.isArray(post.faqs) && post.faqs.length > 0) {
    blocks.push({
      type: 'heading',
      level: 2,
      text: 'Frequently Asked Questions',
    });

    for (const faq of post.faqs) {
      blocks.push({
        type: 'heading',
        level: 3,
        text: faq.question,
      });
      blocks.push({
        type: 'paragraph',
        text: faq.answer,
      });
    }
  }

  return blocks;
}

async function seed() {
  console.log(`Starting migration of ${blogPosts.length} static blog posts to PostgreSQL via Prisma...`);

  let count = 0;

  for (const post of blogPosts) {
    const blocks = convertPostToBlocks(post);
    const createdAt = new Date(
      post.publishedAt.includes('T') ? post.publishedAt : `${post.publishedAt}T12:00:00.000Z`
    );
    const updatedAt = post.updatedAt
      ? new Date(post.updatedAt.includes('T') ? post.updatedAt : `${post.updatedAt}T12:00:00.000Z`)
      : createdAt;

    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags || [],
        readTime: post.readTime || '5 min read',
        isPublished: true,
        contentBlocks: blocks as any,
        updatedAt,
      },
      create: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        coverImage: null,
        category: post.category,
        tags: post.tags || [],
        readTime: post.readTime || '5 min read',
        isPublished: true,
        contentBlocks: blocks as any,
        createdAt,
        updatedAt,
      },
    });
    count++;
  }

  console.log(`Successfully migrated and seeded ${count} blog posts into PostgreSQL via Prisma!`);
  const totalInDb = await prisma.blogPost.count();
  console.log(`Total posts currently in database: ${totalInDb}`);
}

seed()
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
