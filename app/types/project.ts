export type ProjectCategory = 
  | 'all'
  | 'shopify-apps'
  | 'liquid-themes'
  | 'speed-performance'
  | 'custom-engineering'
  | 'b2b-dtc';

export interface ProjectMetric {
  label: string;
  value: string;
  subtext?: string;
  icon?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  projectType: string;
  category: ProjectCategory[];
  featured: boolean;
  logoUrl?: string;
  appStoreUrl?: string;
  liveUrl?: string;
  previewUrl?: string;
  role: string;
  timeline?: string;
  summary: string;
  description: string;
  keyChallenges: string[];
  solutions: string[];
  deliverables: string[];
  tags: string[];
  metrics: ProjectMetric[];
  codeHighlight?: {
    language: string;
    filename: string;
    code: string;
    explanation: string;
  };
  architecture?: {
    frontend?: string;
    backend?: string;
    database?: string;
    apis?: string[];
    deployment?: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string[];
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  role: string;
  company: string;
  content: string;
  projectRef: string;
  rating: number;
  projectTypeTag: string;
  highlight?: string;
}

export interface EstimatorOption {
  id: string;
  name: string;
  description: string;
  estimatedDays: number;
  basePrice: number;
}
