import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Hash,
  Link2,
} from 'lucide-react';
import MarkdownRenderer from '../components/daily/MarkdownRenderer';
import ReadingProgress from '../components/daily/ReadingProgress';
import TableOfContents from '../components/daily/TableOfContents';
import { extractHeadings } from '../lib/markdown';
import {
  formatDate,
  formatDateWithWeekday,
  getAdjacentPosts,
  getDailyPost,
  getRelatedPosts,
} from '../lib/daily';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const DailyDetail = () => {
  const { slug = '' } = useParams();
  const post = getDailyPost(slug);
  const [copied, setCopied] = useState(false);

  const headings = useMemo(() => extractHeadings(post?.content ?? ''), [post?.content]);
  const { older, newer } = useMemo(() => getAdjacentPosts(slug), [slug]);
  const related = useMemo(() => (post ? getRelatedPosts(post) : []), [post]);

  useDocumentTitle(post ? `${post.title} · 技术日报` : '日报不存在 · XF', post?.summary);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* 忽略剪贴板权限问题 */
    }
  };

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-dark-900 px-6 pt-20 text-center">
        <p className="font-mono text-6xl font-bold text-neon-cyan/20">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">这篇日报不存在</h1>
        <p className="mt-3 max-w-md text-sm text-gray-500">
          可能链接已经失效，或者这篇文章还躺在草稿箱里。
        </p>
        <Link
          to="/daily"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-neon-cyan/40 px-5 py-3 text-sm font-semibold text-neon-cyan transition-colors hover:bg-neon-cyan/10"
        >
          <ArrowLeft size={16} />
          返回日报列表
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 pb-20 pt-20 sm:pt-24">
      <ReadingProgress />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_220px]">
          <article className="mx-auto w-full max-w-3xl">
            {/* 面包屑 */}
            <nav aria-label="面包屑" className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
              <Link to="/daily" className="transition-colors hover:text-neon-cyan">
                技术日报
              </Link>
              <ChevronRight size={12} />
              <span className="font-mono">{post.date.slice(0, 4)}</span>
              <ChevronRight size={12} />
              <span className="font-mono">{Number(post.date.slice(5, 7))}月</span>
              <ChevronRight size={12} />
              <span className="truncate text-gray-500">{post.title}</span>
            </nav>

            {/* 标题区 */}
            <header className="mt-6 border-b border-gray-800 pb-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-neon-cyan/70" />
                  {formatDateWithWeekday(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-neon-cyan/70" />
                  {post.readingMinutes} 分钟阅读
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-[2.1rem]">
                {post.title}
              </h1>

              {post.summary && (
                <p className="mt-4 rounded-xl border-l-2 border-neon-cyan/40 bg-neon-cyan/[0.04] px-4 py-3 text-sm leading-relaxed text-gray-400">
                  {post.summary}
                </p>
              )}

              {post.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to="/daily"
                      className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-gray-400 transition-colors hover:bg-neon-cyan/10 hover:text-neon-cyan"
                    >
                      <Hash size={10} />
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {/* 正文 */}
            <div className="pt-2">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* 文末操作 */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gray-800 pt-6">
              <Link
                to="/daily"
                className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-neon-cyan"
              >
                <ArrowLeft size={15} />
                返回列表
              </Link>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-800 px-3 py-2 text-xs text-gray-400 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
              >
                {copied ? <Check size={13} className="text-neon-green" /> : <Link2 size={13} />}
                {copied ? '链接已复制' : '复制本文链接'}
              </button>
            </div>

            {/* 上下篇 */}
            {(older || newer) && (
              <nav className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="相邻日报">
                {older ? (
                  <Link
                    to={`/daily/${older.slug}`}
                    className="group rounded-xl border border-gray-800 bg-dark-800/40 p-4 transition-all duration-300 hover:border-neon-cyan/40"
                  >
                    <span className="flex items-center gap-1 text-[11px] text-gray-600">
                      <ArrowLeft size={12} />
                      更早一篇
                    </span>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-300 transition-colors group-hover:text-neon-cyan">
                      {older.title}
                    </p>
                    <span className="mt-2 block font-mono text-[11px] text-gray-600">
                      {formatDate(older.date)}
                    </span>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {newer && (
                  <Link
                    to={`/daily/${newer.slug}`}
                    className="group rounded-xl border border-gray-800 bg-dark-800/40 p-4 text-right transition-all duration-300 hover:border-neon-cyan/40"
                  >
                    <span className="flex items-center justify-end gap-1 text-[11px] text-gray-600">
                      更新一篇
                      <ArrowRight size={12} />
                    </span>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-300 transition-colors group-hover:text-neon-cyan">
                      {newer.title}
                    </p>
                    <span className="mt-2 block font-mono text-[11px] text-gray-600">
                      {formatDate(newer.date)}
                    </span>
                  </Link>
                )}
              </nav>
            )}

            {/* 相关阅读 */}
            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">相关日报</h2>
                <ul className="divide-y divide-gray-800/70">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/daily/${item.slug}`}
                        className="group flex items-center justify-between gap-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm text-gray-300 transition-colors group-hover:text-neon-cyan">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[11px] text-gray-600">
                            {formatDate(item.date)} · {item.readingMinutes} 分钟
                          </p>
                        </div>
                        <ArrowRight
                          size={15}
                          className="shrink-0 text-gray-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neon-cyan"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          {/* 目录 */}
          <aside className="hidden xl:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DailyDetail;
