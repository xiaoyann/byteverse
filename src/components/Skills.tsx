import { useState } from 'react';
import { Boxes, Code2, Gauge, Sparkles } from 'lucide-react';
import { skillsData } from '../data';

type SkillCategory = 'crossEnd' | 'toolchain' | 'performance' | 'ai';

const Skills = () => {
  const [activeTab, setActiveTab] = useState<SkillCategory>('crossEnd');

  const tabs: { id: SkillCategory; label: string; icon: typeof Code2 }[] = [
    { id: 'crossEnd', label: '跨端与框架', icon: Code2 },
    { id: 'toolchain', label: '构建与工具链', icon: Boxes },
    { id: 'performance', label: '性能工程', icon: Gauge },
    { id: 'ai', label: '语言与 AI', icon: Sparkles },
  ];

  const currentSkills = skillsData[activeTab];

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
            技能<span className="text-gradient">分布</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            按能力域划分，而不是按流行度罗列
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-1 bg-dark-700/50 p-1 rounded-xl border border-gray-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 sm:px-6 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-900 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSkills.map((skill) => (
            <div
              key={skill.name}
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
