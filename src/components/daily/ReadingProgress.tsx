import { useEffect, useState } from 'react';

/** 顶部阅读进度条：贴在导航栏下方 */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-16 z-40 h-0.5 bg-transparent lg:top-20"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
