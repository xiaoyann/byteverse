import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => (
  <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dark-900 px-6 text-center">
    <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
    <div className="relative z-10">
      <p className="font-mono text-7xl font-bold text-neon-cyan/15 sm:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">页面走丢了</h1>
      <p className="mx-auto mt-3 max-w-sm text-sm text-gray-500">
        你访问的地址不存在，可能是链接过期，也可能是手滑打错了一个字符。
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple px-5 py-3 text-sm font-semibold text-dark-900 transition-all hover:glow-cyan"
        >
          <Home size={16} />
          回到首页
        </Link>
        <Link
          to="/daily"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-800 px-5 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
        >
          <ArrowLeft size={16} />
          看看AI技术日报
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
