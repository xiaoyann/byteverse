import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GitBranch } from 'lucide-react';

interface NavLink {
  name: string;
  to: string;
  /** 该链接是否在路由维度上被视为「当前页」 */
  match?: (pathname: string) => boolean;
}

const navLinks: NavLink[] = [
  { name: '首页', to: '/#hero', match: (pathname) => pathname === '/' },
  { name: '关于我', to: '/#about' },
  { name: '技术栈', to: '/#skills' },
  { name: '作品集', to: '/#portfolio' },
  { name: 'AI技术日报', to: '/daily', match: (pathname) => pathname.startsWith('/daily') },
  { name: '联系方式', to: '/#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isDailyPage = pathname.startsWith('/daily');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 路由变化时收起移动端菜单
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const linkClass = (link: NavLink) => {
    const active = link.match?.(pathname) ?? false;
    return `relative whitespace-nowrap text-sm transition-colors duration-300 group ${
      active ? 'text-neon-cyan' : 'text-gray-300 hover:text-neon-cyan'
    }`;
  };

  return (
    // 日报页面区域较暗，未滚动时也给一层底色保证可读性
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-neon-cyan/20'
          : isDailyPage
            ? 'bg-dark-900/80 backdrop-blur-sm border-b border-gray-800/60'
            : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center group-hover:glow-cyan transition-all duration-300">
              <span className="text-dark-900 font-bold text-lg">X</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">XF</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.to} className={linkClass(link)}>
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-neon-cyan transition-all duration-300 ${
                    link.match?.(pathname) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://github.com/xiaoyann"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
            >
              <GitBranch size={20} />
            </a>
            <Link
              to="/#contact"
              className="px-6 py-2.5 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-900 font-semibold rounded-lg hover:glow-cyan transition-all duration-300"
            >
              联系我
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden text-gray-300 hover:text-neon-cyan transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-dark-800/95 backdrop-blur-md border-t border-gray-800 py-4 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = link.match?.(pathname) ?? false;
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className={`px-4 py-2.5 rounded-lg transition-all duration-300 ${
                      active
                        ? 'text-neon-cyan bg-neon-cyan/10'
                        : 'text-gray-300 hover:text-neon-cyan hover:bg-dark-700/50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="flex items-center justify-center space-x-4 pt-4 mt-2 border-t border-gray-800">
                <a
                  href="https://github.com/xiaoyann"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
                >
                  <GitBranch size={20} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
