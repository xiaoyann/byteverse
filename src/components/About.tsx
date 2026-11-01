import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { aboutData } from '../data';

const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-neon-cyan text-sm font-semibold tracking-wider uppercase mb-4 block">
            关于我
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            我的<span className="text-gradient">职业历程</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            十二年，从 PHP 服务端到跨端基础设施，把底层能力做进业务里
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aboutData.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-dark-700/50 border border-gray-800 hover:border-neon-cyan/30 transition-all duration-300 group"
            >
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
                <span className="text-neon-cyan text-xl">{stat.suffix}</span>
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-gray-300 text-lg leading-relaxed">
            {aboutData.bio}
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-8">工作经历</h3>
          {aboutData.experiences.map((exp, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-6 p-6 rounded-2xl bg-dark-700/30 border border-gray-800 hover:border-neon-cyan/30 transition-all duration-300 group"
            >
              <div className="lg:w-64 flex-shrink-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Briefcase className="text-neon-cyan" size={20} />
                  <span className="text-neon-cyan font-semibold">{exp.company}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm mb-2">
                  <Calendar size={16} />
                  <span>{exp.period}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <MapPin size={16} />
                  <span>北京</span>
                </div>
              </div>
              <div className="lg:flex-1">
                <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                  {exp.role}
                </h4>
                <p className="text-gray-400 mb-3">{exp.description}</p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1.5">
                    {exp.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-neon-cyan/70" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.award && (
                  <div className="flex items-center gap-3 mt-4 p-3 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20">
                    <span className="text-neon-cyan text-sm font-semibold">🏆 {exp.award}</span>
                    {exp.awardImage && (
                      <a href={exp.awardImage} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                        <img src={exp.awardImage} alt={exp.award} className="w-12 h-12 object-cover rounded-lg" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
