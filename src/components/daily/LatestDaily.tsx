import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { dailyPosts, dailyStats, formatDate } from '../../lib/daily';
import DailyCard from './DailyCard';

/** 首页导流区块：最新 3 篇日报 */
const LatestDaily = () => {
  const latest = dailyPosts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section id="daily" className="relative overflow-hidden border-y border-gray-800/60 bg-dark-800/30 py-16 lg:py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neon-cyan">
              <Sparkles size={13} />
              每日更新
            </span>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              AI技术<span className="text-gradient">日报</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-500">
              用 WorkBuddy 记录每天的工程实践：踩过的坑、做过的取舍、想清楚的问题。
              已累计 {dailyStats.total} 篇。
            </p>
          </div>

          <Link
            to="/daily"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-neon-cyan/40 px-5 py-3 text-sm font-semibold text-neon-cyan transition-all duration-300 hover:bg-neon-cyan/10 sm:self-auto"
          >
            <span>查看全部日报</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <DailyCard key={post.slug} post={post} variant="compact" />
          ))}
        </div>

        <p className="mt-6 text-xs text-gray-600">
          最近更新于 {formatDate(dailyStats.latest)}
        </p>
      </div>
    </section>
  );
};

export default LatestDaily;
