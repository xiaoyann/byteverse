import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NAV_OFFSET = 88;

/**
 * 路由切换时的滚动管理：
 * - 带 hash：滚动到对应区块（补偿固定导航栏高度）
 * - 无 hash：回到页面顶部（跨页切换不做平滑滚动）
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(id);

      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
