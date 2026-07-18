import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogData } from '../data';

const Blog = () => {
  return (
    <section id="blog" className="py-24 lg:py-32 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-neon-yellow text-sm font-semibold tracking-wider uppercase mb-4 block">
            博客
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            技术<span className="text-gradient">文章摘要</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            分享技术心得和实践经验，与大家共同进步
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogData.map((post) => (
            <article
              key={post.id}
              className="p-6 rounded-2xl bg-dark-800/50 border border-gray-800 hover:border-neon-cyan/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs font-semibold">
                  {post.category}
                </span>
                <span className="flex items-center space-x-1 text-gray-500 text-xs">
                  <Clock size={12} />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h3 className="text-white font-semibold mb-3 group-hover:text-neon-cyan transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <span className="flex items-center space-x-1 text-gray-500 text-xs">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </span>
                <span className="text-neon-cyan text-sm font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform duration-300">
                  <span>阅读</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-neon-cyan/50 text-neon-cyan font-semibold rounded-xl hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-300"
          >
            <span>查看更多文章</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
