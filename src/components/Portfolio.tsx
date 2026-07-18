import { useState } from 'react';
import { GitBranch, ExternalLink, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data';

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-neon-cyan/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <span className="text-neon-green text-sm font-semibold tracking-wider uppercase mb-4 block">
              作品集
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              精选<span className="text-gradient">项目案例</span>
            </h2>
            <p className="text-gray-400 max-w-xl">
              每一个项目都是精心打造的成果，展示了我的技术实力和创造力
            </p>
          </div>
          <a
            href="#contact"
            className="mt-6 lg:mt-0 flex items-center space-x-2 text-neon-cyan hover:text-neon-green transition-colors duration-300 group"
          >
            <span>查看更多项目</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolioData.map((project) => (
            <div
              key={project.id}
              className="relative rounded-2xl overflow-hidden bg-dark-700/50 border border-gray-800 hover:border-neon-cyan/30 transition-all duration-500 group"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-dark-800/80 border border-gray-700 text-gray-300 text-xs hover:border-neon-cyan/50 hover:text-neon-cyan transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-gray-600 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
                  >
                    <GitBranch size={20} />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-gray-600 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-purple transition-transform duration-500 ${
                  hoveredId === project.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
