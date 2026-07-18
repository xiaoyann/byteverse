import { useState } from 'react';
import { Code2, Server, Wrench } from 'lucide-react';
import { skillsData } from '../data';

type SkillCategory = 'frontend' | 'backend' | 'tools';

const Skills = () => {
  const [activeTab, setActiveTab] = useState<SkillCategory>('frontend');

  const tabs: { id: SkillCategory; label: string; icon: typeof Code2 }[] = [
    { id: 'frontend', label: '前端技术', icon: Code2 },
    { id: 'backend', label: '后端技术', icon: Server },
    { id: 'tools', label: '开发工具', icon: Wrench },
  ];

  const getSkills = () => {
    switch (activeTab) {
      case 'frontend':
        return skillsData.frontend;
      case 'backend':
        return skillsData.backend;
      case 'tools':
        return skillsData.tools;
      default:
        return skillsData.frontend;
    }
  };

  return (
    <section id="skills" className="py-24 lg:py-32 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-purple/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-neon-purple text-sm font-semibold tracking-wider uppercase mb-4 block">
            技术栈
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            掌握<span className="text-gradient">技术技能</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            持续学习，不断提升，紧跟技术前沿
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-dark-700/50 p-1 rounded-xl border border-gray-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-900 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getSkills().map((skill, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-dark-800/50 border border-gray-800 hover:border-neon-cyan/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold">{skill.name}</span>
                <span className="text-neon-cyan text-sm font-mono">{skill.level}%</span>
              </div>
              <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full transition-all duration-1000 ease-out group-hover:glow-cyan"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
