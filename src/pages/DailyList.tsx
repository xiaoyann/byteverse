import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Hash, Search, X } from 'lucide-react';
import DailyCard from '../components/daily/DailyCard';
import {
  collectTags,
  dailyPosts,
  dailyStats,
  filterPosts,
  formatDate,
  groupByYear,
} from '../lib/daily';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const PAGE_SIZE = 8;

const YEAR_COLORS = ['text-neon-cyan', 'text-neon-purple', 'text-neon-green', 'text-neon-pink'];

const DailyList = () => {
  const [keyword, setKeyword] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useDocumentTitle('AI技术日报 · XF', '每天用 WorkBuddy 记录工程实践：踩过的坑、做过的取舍、想清楚的问题。');

  const tags = useMemo(() => collectTags(), []);
  const years = useMemo(() => groupByYear(dailyPosts), []);

  const filtered = useMemo(
    () => filterPosts(dailyPosts, { keyword, tag: activeTag, year: activeYear }),
    [keyword, activeTag, activeYear],
  );

  // 筛选条件变化时重置分页
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [keyword, activeTag, activeYear]);

  const shown = filtered.slice(0, visibleCount);
  const grouped = useMemo(() => groupByYear(shown), [shown]);
  const remaining = filtered.length - shown.length;
  const hasFilter = Boolean(keyword || activeTag || activeYear);

  const resetFilters = () => {
    setKeyword('');
    setActiveTag(null);
    setActiveYear(null);
  };

  return (
    <div className="relative min-h-screen bg-dark-900 pb-20 pt-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(0,245,255,0.08),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 栏目标题区 */}
        <header className="mb-10 sm:mb-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/[0.06] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neon-cyan">
            Daily Log
          </span>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            AI技术<span className="text-gradient">日报</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            每天用 WorkBuddy 记录工程实践：踩过的坑、做过的取舍、想清楚的问题。
            按日期倒序排列，支持按标签与年份检索。
          </p>

          <dl className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-gray-800 pt-6">
            {[
              { label: '累计篇数', value: `${dailyStats.total}`, unit: '篇' },
              { label: '标签数量', value: `${dailyStats.tags}`, unit: '个' },
              { label: '最近更新', value: dailyStats.latest ? formatDate(dailyStats.latest) : '—', unit: '' },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] uppercase tracking-wider text-gray-600">{item.label}</dt>
                <dd className="mt-1 font-mono text-lg font-semibold text-white">
                  {item.value}
                  {item.unit && (
                    <span className="ml-1 font-sans text-xs font-normal text-gray-500">{item.unit}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
          {/* 主列表 */}
          <div className="min-w-0">
            {/* 工具条 */}
            <div className="sticky top-16 z-30 -mx-4 mb-6 border-b border-gray-800/60 bg-dark-900/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:top-20 lg:-mx-0 lg:rounded-xl lg:border lg:border-gray-800/80 lg:px-4">
              <div className="relative">
                <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="search"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="搜索标题、摘要、正文或标签…"
                  aria-label="搜索日报"
                  className="w-full rounded-lg border border-gray-800 bg-dark-800/60 py-2.5 pl-10 pr-10 text-sm text-gray-200 placeholder:text-gray-600 focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30"
                />
                {keyword && (
                  <button
                    type="button"
                    onClick={() => setKeyword('')}
                    aria-label="清空搜索"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 transition-colors hover:text-neon-cyan"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <FilterChip active={activeYear === null} onClick={() => setActiveYear(null)}>
                  全部
                </FilterChip>

                {years.map((group) => (
                  <FilterChip
                    key={group.year}
                    active={activeYear === group.year}
                    onClick={() => setActiveYear(activeYear === group.year ? null : group.year)}
                  >
                    {group.year}
                    <span className="ml-1 text-[10px] opacity-60">{group.posts.length}</span>
                  </FilterChip>
                ))}

                <span className="mx-1 hidden h-4 w-px bg-gray-800 sm:block" />

                <div className="flex w-full gap-2 overflow-x-auto pb-1 sm:w-auto sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {tags.slice(0, 8).map((tag) => (
                    <FilterChip
                      key={tag.tag}
                      active={activeTag === tag.tag}
                      onClick={() => setActiveTag(activeTag === tag.tag ? null : tag.tag)}
                    >
                      <Hash size={10} className="mr-1 opacity-70" />
                      {tag.tag}
                    </FilterChip>
                  ))}
                </div>
              </div>
            </div>

            <p className="mb-4 text-xs text-gray-600">
              共 {filtered.length} 篇
              {hasFilter && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-3 text-neon-cyan/80 underline-offset-4 hover:underline"
                >
                  清除筛选
                </button>
              )}
            </p>

            {/* 列表 */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-800 py-20 text-center">
                <Search size={32} className="mx-auto mb-4 text-gray-700" />
                <p className="text-sm text-gray-500">没有匹配的日报</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 text-sm text-neon-cyan hover:underline"
                >
                  查看全部内容
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {grouped.map((group, groupIndex) => (
                  <section key={group.year} id={`year-${group.year}`} className="scroll-mt-24">
                    <div className="mb-4 flex items-center gap-3">
                      <h2 className={`font-mono text-xl font-bold ${YEAR_COLORS[groupIndex % YEAR_COLORS.length]}`}>
                        {group.year}
                      </h2>
                      <span className="text-xs text-gray-600">{group.posts.length} 篇</span>
                      <span className="h-px flex-1 bg-gradient-to-r from-gray-800 to-transparent" />
                    </div>

                    <div className="space-y-4">
                      {group.posts.map((post) => (
                        <DailyCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {remaining > 0 && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-800 px-6 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-neon-cyan/40 hover:text-neon-cyan"
                >
                  加载更多
                  <span className="font-mono text-xs text-gray-600">余 {remaining} 篇</span>
                </button>
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">
              <section className="rounded-2xl border border-gray-800 bg-dark-800/40 p-5">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">归档</h3>
                <ul className="space-y-3">
                  {years.map((group) => (
                    <li key={group.year}>
                      <button
                        type="button"
                        onClick={() => setActiveYear(activeYear === group.year ? null : group.year)}
                        className={`flex w-full items-baseline justify-between text-sm transition-colors ${
                          activeYear === group.year ? 'text-neon-cyan' : 'text-gray-300 hover:text-neon-cyan'
                        }`}
                      >
                        <span className="font-mono">{group.year}</span>
                        <span className="text-xs text-gray-600">{group.posts.length}</span>
                      </button>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {[...new Set(group.posts.map((post) => post.date.slice(5, 7)))].map((month) => (
                          <span
                            key={month}
                            className="rounded bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-gray-600"
                          >
                            {Number(month)}月
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-gray-800 bg-dark-800/40 p-5">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.tag}
                      type="button"
                      onClick={() => setActiveTag(activeTag === tag.tag ? null : tag.tag)}
                      className={`rounded-full px-2.5 py-1 text-[11px] transition-all duration-200 ${
                        activeTag === tag.tag
                          ? 'bg-neon-cyan/15 text-neon-cyan'
                          : 'bg-white/[0.03] text-gray-500 hover:bg-neon-cyan/10 hover:text-neon-cyan'
                      }`}
                    >
                      {tag.tag}
                      <span className="ml-1 opacity-50">{tag.count}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-gray-800 bg-dark-800/40 p-5">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">关于本栏目</h3>
                <p className="text-xs leading-relaxed text-gray-500">
                  内容由 WorkBuddy 每日辅助生成，导出 Markdown 后归档进仓库。
                  文章随代码一起版本化，改动可追溯。
                </p>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs transition-all duration-200 ${
        active
          ? 'border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan'
          : 'border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

export default DailyList;
