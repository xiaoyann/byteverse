import { ArrowRight, Star } from 'lucide-react';
import { openSourceData, portfolioData } from '../data';

const totalStars = openSourceData.reduce((sum, item) => sum + item.stars, 0);

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-neon-cyan/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <span className="text-neon-green text-sm font-semibold tracking-wider uppercase mb-4 block">
              项目经历
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              做过的<span className="text-gradient">基础设施</span>
            </h2>
            <p className="text-gray-400 max-w-xl">
              五个跨端框架与工具链项目，按「问题 → 动作 → 结果」组织
            </p>
          </div>
          <a
            href="#contact"
            className="mt-6 lg:mt-0 flex items-center space-x-2 text-neon-cyan hover:text-neon-green transition-colors duration-300 group"
          >
            <span>聊聊项目细节</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {portfolioData.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col rounded-2xl border border-gray-800 bg-dark-700/40 p-6 sm:p-8 transition-all duration-300 hover:border-neon-cyan/40 hover:bg-dark-700/60"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-neon-cyan to-neon-purple transition-transform duration-500 group-hover:scale-x-100" />

              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-neon-cyan sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-[11px] text-gray-500">
                    {project.role} · {project.period}
                  </p>
                </div>
                <span className="font-mono text-sm text-neon-cyan/40">
                  {String(project.id).padStart(2, '0')}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-400">{project.background}</p>

              <ul className="mt-4 space-y-1.5">
                {project.actions.map((action) => (
                  <li key={action} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-neon-cyan/60" />
                    <span className="leading-relaxed">{action}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-800 pt-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="font-mono text-sm font-semibold text-neon-cyan sm:text-base">
                      {metric.value}
                    </div>
                    <div className="mt-0.5 text-[11px] leading-tight text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-700 bg-dark-800/60 px-2.5 py-0.5 text-[11px] text-gray-400 transition-colors duration-300 group-hover:border-neon-cyan/30 group-hover:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-gray-600">
          以上均为企业内部基础设施项目，不提供公开代码链接。指标为项目落地后统计口径下的实测值，
          细节与验证条件可在沟通时展开说明。
        </p>

        {openSourceData.length > 0 && (
          <div className="mt-16">
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="text-lg font-semibold text-white">开源项目</h3>
              <span className="rounded-full bg-neon-cyan/10 px-2.5 py-0.5 font-mono text-[11px] text-neon-cyan">
                {openSourceData.length} 个 · 累计 {totalStars.toLocaleString()} ★
              </span>
              <span className="hidden h-px flex-1 bg-gradient-to-r from-gray-800 to-transparent sm:block" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {openSourceData.map((item) => (
                <a
                  key={item.name}
                  href={item.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-gray-800 bg-dark-700/40 p-5 transition-all duration-300 hover:border-neon-cyan/40 hover:bg-dark-700/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="truncate font-mono text-sm font-semibold text-white transition-colors duration-300 group-hover:text-neon-cyan">
                        {item.name}
                      </h4>
                      <span className="font-mono text-[11px] text-gray-600">{item.owner}</span>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 font-mono text-sm font-semibold text-neon-cyan">
                      <Star size={11} />
                      {item.stars.toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-3 text-[13px] leading-relaxed text-gray-400">{item.description}</p>

                  <ul className="mt-3 flex-1 space-y-1.5">
                    {item.highlights.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-[13px] text-gray-500">
                        <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-neon-cyan/50" />
                        <span className="leading-relaxed">{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-gray-800 pt-3 font-mono text-[11px] text-gray-600">
                    <span>
                      {item.language} · {item.license} · {item.forks} forks
                    </span>
                    <span className="shrink-0">{item.period}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
