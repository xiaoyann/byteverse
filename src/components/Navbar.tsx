import { useState, useEffect } from 'react';
import { Menu, X, GitBranch, Globe2 } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; href: string }[] = [
    { name: '首页', href: '#hero' },
    { name: '关于我', href: '#about' },
    { name: '技术栈', href: '#skills' },
    { name: '作品集', href: '#portfolio' },
    { name: '博客', href: '#blog' },
    { name: '联系方式', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-dark-900/95 backdrop-blur-md border-b border-neon-cyan/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#hero" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center group-hover:glow-cyan transition-all duration-300">
              <span className="text-dark-900 font-bold text-lg">X</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              XF
            </span>
          </a>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
            >
              <GitBranch size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
            >
              <Globe2 size={20} />
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-900 font-semibold rounded-lg hover:glow-cyan transition-all duration-300"
            >
              联系我
            </a>
          </div>

          <button
            className="lg:hidden text-gray-300 hover:text-neon-cyan transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-dark-800/95 backdrop-blur-md border-t border-gray-800 py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-gray-300 hover:text-neon-cyan hover:bg-dark-700/50 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-800">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
                >
                  <GitBranch size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
                >
                  <Globe2 size={20} />
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
