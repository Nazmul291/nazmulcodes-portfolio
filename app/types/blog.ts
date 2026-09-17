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
}
