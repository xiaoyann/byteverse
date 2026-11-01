import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Hash } from 'lucide-react';
import { formatDayMonth, getDay, getMonthLabel, getWeekday, type DailyPost } from '../../lib/daily';

interface Props {
  post: DailyPost;
  variant?: 'default' | 'compact';
}

/** 列表页的日报卡片 */
const DailyCard = ({ post, variant = 'default' }: Props) => {
  if (variant === 'compact') {
    return (
      <Link
        to={`/daily/${post.slug}`}
        className="group flex items-center justify-between gap-4 rounded-xl border border-gray-800 bg-dark-800/40 px-4 py-3 transition-all duration-300 hover:border-neon-cyan/40 hover:bg-dark-800/70"
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-200 transition-colors group-hover:text-neon-cyan">
            {post.title}
          </p>
          <p className="mt-1 font-mono text-[11px] text-gray-500">{formatDayMonth(post.date)}</p>
        </div>
        <ArrowRight
          size={16}
          className="shrink-0 text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neon-cyan"
        />
      </Link>
    );
  }

  return (
    <Link
      to={`/daily/${post.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-gray-800 bg-dark-800/40 p-5 transition-all duration-300 hover:border-neon-cyan/40 hover:bg-dark-800/70 hover:shadow-[0_0_30px_rgba(0,245,255,0.08)] sm:p-6"
    >
      {/* 左侧高亮条 */}
      <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-gradient-to-b from-neon-cyan to-neon-purple transition-transform duration-300 group-hover:scale-y-100" />

      <div className="flex gap-4 sm:gap-6">
        {/* 日期块：桌面端竖排，移动端横排 */}
        <div className="hidden w-14 shrink-0 flex-col items-center pt-0.5 sm:flex">
          <span className="font-mono text-3xl font-bold leading-none text-white transition-colors duration-300 group-hover:text-neon-cyan">
            {getDay(post.date)}
          </span>
          <span className="mt-1 text-[11px] text-gray-500">{getMonthLabel(post.date)}</span>
          <span className="mt-0.5 text-[11px] text-gray-600">{getWeekday(post.date)}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 sm:hidden">
            <span className="font-mono text-xs text-neon-cyan">{formatDayMonth(post.date)}</span>
            <span className="text-xs text-gray-600">{getWeekday(post.date)}</span>
          </div>

          <h3 className="text-base font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-neon-cyan sm:text-lg">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">{post.summary}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <Clock size={12} />
              <span>{post.readingMinutes} 分钟</span>
            </span>
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-neon-cyan/10 px-2.5 py-0.5 text-[11px] text-neon-cyan/80"
              >
                <Hash size={10} />
                {tag}
              </span>
            ))}
            <span className="ml-auto hidden items-center gap-1 text-xs font-medium text-gray-600 transition-colors group-hover:text-neon-cyan sm:flex">
              阅读
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DailyCard;
