import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type ReactNode,
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Copy } from 'lucide-react';
import { slugifyHeading } from '../../lib/markdown';

/* ------------------------------------------------------------------ */
/* 工具                                                                */
/* ------------------------------------------------------------------ */

function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children);
  return '';
}

function getLanguage(children: ReactNode): string | null {
  const first = Children.toArray(children)[0];
  if (!isValidElement<{ className?: string }>(first)) return null;
  const match = /language-([\w-]+)/.exec(first.props.className ?? '');
  return match ? match[1] : null;
}

/* ------------------------------------------------------------------ */
/* 代码块                                                              */
/* ------------------------------------------------------------------ */

function CodeBlock({ language, raw, children }: { language: string | null; raw: string; children: ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* 剪贴板不可用时静默失败，不打断阅读 */
    }
  };

  return (
    <div className="group/code my-6 overflow-hidden rounded-xl border border-gray-800 bg-[#0b0d16]">
      <div className="flex items-center justify-between border-b border-gray-800/70 bg-white/[0.02] px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
          {language ?? 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? '已复制' : '复制代码'}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-gray-500 transition-colors hover:bg-white/5 hover:text-neon-cyan"
        >
          {copied ? <Check size={12} className="text-neon-green" /> : <Copy size={12} />}
          <span>{copied ? '已复制' : '复制'}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-gray-200">
        {children}
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 渲染器                                                              */
/* ------------------------------------------------------------------ */

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="text-[15px] sm:text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-10 mb-4 scroll-mt-28 border-l-2 border-neon-cyan pl-3 text-2xl font-bold text-white">
              {children}
            </h2>
          ),
          h2: ({ children }) => {
            const text = extractText(children);
            return (
              <h2
                id={slugifyHeading(text)}
                className="mt-12 mb-4 scroll-mt-28 border-l-2 border-neon-cyan pl-3 text-xl font-bold text-white sm:text-2xl"
              >
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = extractText(children);
            return (
              <h3
                id={slugifyHeading(text)}
                className="mt-8 mb-3 scroll-mt-28 text-lg font-semibold text-gray-100"
              >
                {children}
              </h3>
            );
          },
          h4: ({ children }) => (
            <h4 className="mt-6 mb-2 scroll-mt-28 text-base font-semibold text-gray-200">{children}</h4>
          ),
          p: ({ children }) => <p className="my-4 leading-8 text-gray-300">{children}</p>,
          a: ({ href, children }) => {
            const external = Boolean(href && /^https?:\/\//.test(href));
            return (
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-neon-cyan underline decoration-neon-cyan/30 underline-offset-4 transition-colors hover:decoration-neon-cyan"
              >
                {children}
              </a>
            );
          },
          ul: ({ children }) => <ul className="my-4 space-y-2 pl-5">{children}</ul>,
          ol: ({ children }) => (
            <ol className="my-4 list-decimal space-y-2 pl-5 marker:text-neon-cyan/70">{children}</ol>
          ),
          li: ({ children, ...props }) => (
            <li
              className="relative pl-1 leading-7 text-gray-300 marker:text-neon-cyan/60 [&>p]:my-1"
              {...props}
            >
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 rounded-r-lg border-l-2 border-neon-purple/60 bg-neon-purple/[0.06] px-4 py-3 text-gray-400 [&>p]:my-1 [&>p]:text-gray-400">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-10 border-gray-800" />,
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          em: ({ children }) => <em className="text-gray-200 not-italic">{children}</em>,
          pre: ({ children }) => {
            const language = getLanguage(children);
            const raw = extractText(children).replace(/\n$/, '');
            const marked = Children.toArray(children).map((child) =>
              isValidElement<{ className?: string }>(child)
                ? cloneElement(child, {
                    className: `${child.props.className ?? ''} md-block-code`.trim(),
                  })
                : child,
            );

            return (
              <CodeBlock language={language} raw={raw}>
                {marked}
              </CodeBlock>
            );
          },
          code: ({ className, children, ...props }) => {
            const isBlock = Boolean(className && /language-|md-block-code/.test(className));
            if (isBlock) {
              return (
                <code className="font-mono text-[13px] leading-relaxed text-gray-200" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className="rounded-md bg-dark-700/80 px-1.5 py-0.5 font-mono text-[0.875em] text-neon-green"
                {...props}
              >
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-gray-800">
              <table className="w-full min-w-[420px] border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-white/[0.04]">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b border-gray-800 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-gray-800/60 px-4 py-2.5 align-top text-gray-300 last:border-0">
              {children}
            </td>
          ),
          img: ({ src, alt }) => (
            <img
              src={typeof src === 'string' ? src : undefined}
              alt={alt ?? ''}
              loading="lazy"
              className="my-6 w-full rounded-xl border border-gray-800"
            />
          ),
          input: ({ checked, ...props }) => (
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mr-2 h-3.5 w-3.5 accent-neon-cyan"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
