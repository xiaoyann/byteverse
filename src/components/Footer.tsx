import { Link } from 'react-router-dom';
import { Heart, GitBranch, Globe2, MailIcon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links: { name: string; to: string }[] = [
    { name: '首页', to: '/#hero' },
    { name: '关于我', to: '/#about' },
    { name: '技术栈', to: '/#skills' },
    { name: '作品集', to: '/#portfolio' },
    { name: '博客', to: '/#blog' },
    { name: 'AI技术日报', to: '/daily' },
    { name: '联系方式', to: '/#contact' },
  ];

  return (
    <footer className="py-12 bg-dark-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center">
              <span className="text-dark-900 font-bold text-sm">X</span>
            </div>
            <span className="text-white font-semibold">XF</span>
          </Link>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-sm text-gray-500 hover:text-neon-cyan transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/xiaoyann"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-lg border border-gray-700 flex items-center justify-center text-gray-500 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
            >
              <GitBranch size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg border border-gray-700 flex items-center justify-center text-gray-500 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
            >
              <Globe2 size={16} />
            </a>
            <a
              href="mailto:0x0886@gmail.com"
              aria-label="Email"
              className="w-8 h-8 rounded-lg border border-gray-700 flex items-center justify-center text-gray-500 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
            >
              <MailIcon size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm flex flex-wrap items-center justify-center gap-2">
            <span>&copy; {currentYear} XF. All rights reserved.</span>
            <span className="text-neon-pink flex items-center">
              <Heart size={14} className="mr-1" />
              Made with passion
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
