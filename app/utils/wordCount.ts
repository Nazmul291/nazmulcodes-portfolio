import type { ContentBlock } from '~/types/blog';

export const THIN_CONTENT_MAX = 800;
export const IN_DEPTH_MIN = 1200;

export type WordCountTier = 'thin' | 'borderline' | 'in-depth';

export function countWords(text: string): number {
  const plain = text.replace(/<[^>]*>/g, ' ').trim();
  return plain ? plain.split(/\s+/).length : 0;
}

// Code blocks are excluded: they inflate counts without adding the prose reviewers judge content depth by.
export function countBlockWords(blocks: ContentBlock[]): number {
  return blocks.reduce((total, block) => {
    switch (block.type) {
      case 'heading':
      case 'paragraph':
      case 'callout':
        return total + countWords(block.text);
      case 'list':
        return total + block.items.reduce((sum, item) => sum + countWords(item), 0);
      case 'image':
        return total + countWords(block.caption ?? '');
      default:
        return total;
    }
  }, 0);
}

export function getWordCountTier(words: number): WordCountTier {
  if (words < THIN_CONTENT_MAX) return 'thin';
  if (words < IN_DEPTH_MIN) return 'borderline';
  return 'in-depth';
}
