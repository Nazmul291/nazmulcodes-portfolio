// ─── Existing Types (preserved for backward compatibility) ─────────────────

export type BlogCategory =
  | 'Shopify & E-Commerce'
  | 'Performance & Web Vitals'
  | 'React & Frontend'
  | 'Full-Stack & APIs'
  | 'Freelancing & Career'
  | 'Founder Journey';

export interface BlogCodeSnippet {
  language: string;
  filename?: string;
  code: string;
  explanation?: string;
}

export interface BlogSection {
  heading: string;
  content: string;
  codeSnippet?: BlogCodeSnippet;
  tip?: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  learningOutcomes: string[];
  introduction: string;
  sections: BlogSection[];
  conclusion: string;
  faqs?: BlogFaq[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
}

// ─── New Block-Based Content System ────────────────────────────────────────

export interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4;
  text: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface CodeBlock {
  type: 'code';
  language: string;
  code: string;
  filename?: string;
}

export interface CalloutBlock {
  type: 'callout';
  variant: 'info' | 'warning' | 'tip';
  text: string;
}

export interface ImageBlock {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
}

export interface ListBlock {
  type: 'list';
  style: 'bullet' | 'ordered';
  items: string[];
}

/** Discriminated union of all block types used in the visual block builder. */
export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | CodeBlock
  | CalloutBlock
  | ImageBlock
  | ListBlock;

/** Blog post as stored in SQLite and used by admin CMS routes. */
export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  readTime: string;
  isPublished: boolean;
  contentBlocks: ContentBlock[];
  createdAt: string;
  updatedAt: string;
}

/** Lightweight post shape for blog index listing (omits heavy contentBlocks). */
export interface DbBlogPostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  readTime: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
