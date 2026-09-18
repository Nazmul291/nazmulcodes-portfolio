import React, { useState } from 'react';
import { Copy, Check, Info, AlertTriangle, Lightbulb } from 'lucide-react';
import type { ContentBlock } from '~/types/blog';

/**
 * Renders an array of ContentBlock objects into sequential JSX elements.
 *
 * Uses the existing site design system CSS classes (article-prose, code-container,
 * code-header, code-content, pro-tip-box, glass-card) for visual consistency
 * with the original blog post layout.
 */

interface BlockRendererProps {
  blocks: ContentBlock[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="article-prose">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return <HeadingBlockComponent key={index} block={block} />;

          case 'paragraph':
            return (
              <p
                key={index}
                style={{
                  fontSize: '1.12rem',
                  color: 'var(--text-primary)',
                  fontWeight: 400,
                  lineHeight: 1.85,
                  marginBottom: '1.5rem',
                }}
              >
                {block.text}
              </p>
            );

          case 'code':
            return (
              <div key={index} className="code-container" style={{ margin: '1.75rem 0' }}>
                <div className="code-header">
                  <span>
                    {block.filename || `${block.language.toUpperCase()} SNIPPET`}
                  </span>
                  <button
                    onClick={() => handleCopyCode(block.code, index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.78rem',
                    }}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check size={13} className="text-emerald" />
                        <span className="text-emerald">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="code-content">
                  <code>{block.code}</code>
                </pre>
              </div>
            );

          case 'callout':
            return <CalloutBlockComponent key={index} block={block} />;

          case 'image':
            return (
              <figure
                key={index}
                style={{
                  margin: '2rem 0',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={block.url}
                  alt={block.alt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                {block.caption && (
                  <figcaption
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      textAlign: 'center',
                      marginTop: '0.75rem',
                      fontStyle: 'italic',
                    }}
                  >
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'list': {
            const ListTag = block.style === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag
                key={index}
                style={{
                  paddingLeft: '1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {block.items.map((item, iIdx) => (
                  <li
                    key={iIdx}
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      fontSize: '1.05rem',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ListTag>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function HeadingBlockComponent({ block }: { block: { level: 1 | 2 | 3 | 4; text: string } }) {
  const styles: Record<number, React.CSSProperties> = {
    1: { fontSize: 'clamp(2rem, 4.5vw, 2.85rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '1.25rem', color: 'var(--text-primary)' },
    2: { fontSize: '1.65rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2.5rem 0 1rem 0' },
    3: { fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', margin: '1.75rem 0 0.75rem 0' },
    4: { fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '1.5rem 0 0.5rem 0' },
  };

  const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
  return <Tag style={styles[block.level]}>{block.text}</Tag>;
}

function CalloutBlockComponent({ block }: { block: { variant: 'info' | 'warning' | 'tip'; text: string } }) {
  const config = {
    info: {
      icon: <Info size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />,
      label: 'Note',
      borderColor: 'var(--accent-cyan)',
    },
    warning: {
      icon: <AlertTriangle size={20} style={{ color: 'var(--accent-amber)', flexShrink: 0, marginTop: '2px' }} />,
      label: 'Warning',
      borderColor: 'var(--accent-amber)',
    },
    tip: {
      icon: <Lightbulb size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />,
      label: 'Pro Tip',
      borderColor: 'var(--accent-emerald)',
    },
  };

  const { icon, label, borderColor } = config[block.variant];

  return (
    <div
      className="pro-tip-box"
      style={{
        margin: '1.5rem 0',
        borderLeftColor: borderColor,
      }}
    >
      {icon}
      <div>
        <strong style={{ color: 'var(--text-primary)' }}>{label}:</strong> {block.text}
      </div>
    </div>
  );
}
