import { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import type { Heading } from '../../lib/markdown';

interface Props {
  headings: Heading[];
}

/** 桌面端右侧悬浮目录，跟随滚动高亮当前章节 */
const TableOfContents = ({ headings }: Props) => {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

  useEffect(() => {
    if (headings.length === 0) return;

    const update = () => {
      let current = headings[0].id;
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= 132) current = heading.id;
      }
      setActiveId(current);
    };

    // 字体加载 / 图片撑开高度都会搬动标题位置，rAF 里补算一次
    update();
    const raf = requestAnimationFrame(update);

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="文章目录" className="sticky top-28">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
        <List size={14} className="text-neon-cyan" />
        <span>本页目录</span>
      </div>

      <ul className="space-y-0.5 border-l border-gray-800">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={`${heading.id}-${heading.text}`}>
              <a
                href={`#${heading.id}`}
                className={`-ml-px block border-l-2 py-1.5 text-[13px] leading-snug transition-all duration-200 ${
                  heading.level === 3 ? 'pl-6' : 'pl-4'
                } ${
                  active
                    ? 'border-neon-cyan text-neon-cyan'
                    : 'border-transparent text-gray-500 hover:border-gray-600 hover:text-gray-300'
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
