import { useEffect, useState } from 'react';
import { ChevronDown, GitBranch, Globe2, MailIcon, Sparkles } from 'lucide-react';
import { heroData } from '../data';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = heroData.title;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-dark-700/50 border border-neon-cyan/20 mb-8 animate-fade-in">
          <Sparkles className="text-neon-cyan" size={16} />
          <span className="text-sm text-gray-300">欢迎来到我的个人网站</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-slide-up">
          <span className="text-white">{heroData.name}</span>
          <br />
          <span className="text-gradient">
            {displayText}
            <span className="border-r-2 border-neon-cyan ml-1 animate-blink" />
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {heroData.subtitle}
        </p>

        <p className="text-gray-500 max-w-xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {heroData.description}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          {heroData.highlights.map((highlight, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-dark-700/50 border border-gray-700 text-gray-300 text-sm hover:border-neon-cyan/50 hover:text-neon-cyan transition-all duration-300"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <a
            href="#portfolio"
            className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-900 font-semibold rounded-xl hover:glow-cyan transition-all duration-300 flex items-center space-x-2"
          >
            <span>查看作品</span>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-xl hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
          >
            联系我
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all duration-300"
          >
            <GitBranch size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all duration-300"
          >
            <Globe2 size={24} />
          </a>
          <a
            href="mailto:zhanghaoran@example.com"
            className="w-12 h-12 rounded-xl border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all duration-300"
          >
            <MailIcon size={24} />
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-neon-cyan transition-colors duration-300 animate-float"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
};

export default Hero;
