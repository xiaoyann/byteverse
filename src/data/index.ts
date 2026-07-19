export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  award?: string;
  awardImage?: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix: string;
}

export interface AboutData {
  bio: string;
  experiences: Experience[];
  stats: Stat[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

export interface ContactData {
  email: string;
  phone?: string;
  location: string;
  github: string;
  linkedin: string;
  wechat: string;
  slogan: string;
}

export const heroData: HeroData = {
  name: 'XF',
  title: '资深前端开发工程师',
  subtitle: '10年+ Web 开发经验 | 专注于构建高性能、可扩展的用户界面',
  description: '我是一名热爱技术的前端开发者，拥有丰富的企业级项目经验。擅长 React、Vue、Node.js 等技术栈，致力于创造优雅的用户体验。',
  highlights: ['架构设计', '性能优化', '团队协作', '技术创新'],
};

export const aboutData: AboutData = {
  bio: '2014年入行，在北京从事前端开发工作超过10年。曾就职于多家知名互联网公司，参与过多个千万级用户产品的开发。对前端技术充满热情，乐于分享和学习新技术。',
  experiences: [
    {
      company: '美团',
      role: '前端技术专家',
      period: '2017.12 - 至今',
      description: '负责核心业务前端架构设计与开发，主导技术方案落地和团队技术建设。',
    },
    {
      company: '北京波巴布信息技术有限责任公司',
      role: '前端开发',
      period: '2016.11 - 2017.12',
      description: '全面负责前端团队管理与技术体系建设，将团队从2人发展到5人，主导招聘与培养工作。根据业务需求（PC网站、移动端WebApp、H5活动页、原生APP）制定技术选型与开发规范，覆盖需求分析、开发、部署、运维全流程，包括风险评估、编码规范、版本控制、多屏适配、资源压缩合并、缓存策略及线上异常监控。提炼移动端通用UI组件库，显著提升开发效率。推进工程化建设：基于vue-cli定制项目模板实现快速初始化，引入ESLint+pre-commit保障代码质量，使用Babel编译ES6、Stylus/PostCSS增强样式能力、EJS模板引擎处理PC多页网站。站在全局视角与产品、设计、后端协作，推动产品方案落地。',
    },
    {
      company: '北京蜜蜂汇金科技有限公司',
      role: '前端开发',
      period: '2014.10 - 2016.11',
      description: '负责多个金融产品PC站和移动WebApp的开发，主导技术栈迭代升级：从Backbone+FIS+jQuery演进到ES6+React/Vue+Webpack体系，推动前端工程化转型（技术总结：https://segmentfault.com/a/1190000005969488）。2015年React Native发布后早期尝鲜者，独立负责《钱隆来了》APP iOS端开发与发布，2个月内完成30+页面开发，为公司节约原生研发成本。过程中学习了原生iOS开发，封装微信等第三方SDK，解决RN早期兼容性问题，成为团队技术攻坚主力。',
    },
    {
      company: '楚楚街（醋溜网络科技）',
      role: 'PHP后端开发',
      period: '2014.01 - 2014.10',
      description: '主导《楚楚街主站》《淘宝U站》《9块9商家活动发布系统》后端架构设计与核心功能开发，基于PHP+MySQL构建高可用电商服务体系，设计并实现商品、订单、支付等核心业务模块的数据库模型与API接口。参与《楚楚街商城》系统研发，负责退款退货全链路流程设计与实现，以及淘宝商品数据迁移系统开发，支撑日均百万级订单处理能力。',
      award: '月度优秀员工奖',
      awardImage: '/IMG_0146.JPG',
    },
  ],
  stats: [
    { label: '工作年限', value: '10+', suffix: '年' },
    { label: '项目经验', value: '50+', suffix: '个' },
    { label: '技术栈', value: '30+', suffix: '种' },
    { label: 'GitHub', value: '1000+', suffix: 'stars' },
  ],
};

export const skillsData: SkillsData = {
  frontend: [
    { name: 'React', level: 95, icon: 'React' },
    { name: 'Vue', level: 90, icon: 'Vue' },
    { name: 'TypeScript', level: 92, icon: 'TypeScript' },
    { name: 'JavaScript', level: 98, icon: 'JavaScript' },
    { name: 'CSS3', level: 90, icon: 'CSS3' },
    { name: 'HTML5', level: 95, icon: 'HTML5' },
    { name: 'Webpack/Vite', level: 85, icon: 'Webpack' },
    { name: 'Tailwind CSS', level: 88, icon: 'Tailwind' },
  ],
  backend: [
    { name: 'Node.js', level: 85, icon: 'NodeJS' },
    { name: 'Express', level: 80, icon: 'Express' },
    { name: 'MongoDB', level: 75, icon: 'MongoDB' },
    { name: 'Redis', level: 70, icon: 'Redis' },
  ],
  tools: [
    { name: 'Git', level: 95, icon: 'Git' },
    { name: 'VS Code', level: 90, icon: 'Code' },
    { name: 'Docker', level: 75, icon: 'Docker' },
    { name: 'Jenkins', level: 70, icon: 'Jenkins' },
  ],
};

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: '企业级后台管理系统',
    description: '基于 React + TypeScript 构建的现代化后台管理系统，支持主题切换、权限控制、数据可视化等功能。',
    tags: ['React', 'TypeScript', 'Ant Design', 'ECharts'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20dark%20theme%20dashboard%20admin%20panel%20with%20charts%20and%20data%20visualization&image_size=landscape_16_9',
    github: 'https://github.com/xiaoyann',
    demo: '#',
  },
  {
    id: 2,
    title: '电商平台前端重构',
    description: '使用 Vue3 + Vite 对传统电商平台进行现代化重构，页面加载速度提升60%。',
    tags: ['Vue3', 'Vite', 'Pinia', 'Element Plus'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=e-commerce%20shopping%20website%20dark%20theme%20modern%20design&image_size=landscape_16_9',
    github: 'https://github.com/xiaoyann',
    demo: '#',
  },
  {
    id: 3,
    title: '数据可视化大屏',
    description: '实时数据监控大屏，支持多种图表类型和自定义配置，服务于企业数据决策。',
    tags: ['React', 'ECharts', 'WebSocket', 'Canvas'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20visualization%20dashboard%20big%20screen%20dark%20theme%20with%20neon%20charts&image_size=landscape_16_9',
    github: 'https://github.com/xiaoyann',
    demo: '#',
  },
  {
    id: 4,
    title: '移动端H5活动页框架',
    description: '可配置化的H5活动页框架，支持快速搭建营销活动页面，提升开发效率。',
    tags: ['React', 'Tailwind CSS', 'Anime.js', 'Responsive'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20h5%20landing%20page%20dark%20theme%20creative%20design%20with%20animations&image_size=landscape_16_9',
    github: 'https://github.com/xiaoyann',
    demo: '#',
  },
];

export const blogData: BlogPost[] = [
  {
    id: 1,
    title: 'React 18 并发特性深度解析',
    excerpt: '深入探讨 React 18 的并发渲染机制，包括 Concurrent Mode、Suspense、Transition 等核心特性。',
    date: '2024-01-15',
    category: 'React',
    readTime: '12分钟',
  },
  {
    id: 2,
    title: '前端性能优化实战指南',
    excerpt: '从网络层、渲染层、JavaScript执行层三个维度，全面讲解前端性能优化的最佳实践。',
    date: '2024-01-10',
    category: '性能优化',
    readTime: '15分钟',
  },
  {
    id: 3,
    title: 'TypeScript 类型体操进阶',
    excerpt: '通过实际案例学习 TypeScript 高级类型，提升类型安全和代码质量。',
    date: '2024-01-05',
    category: 'TypeScript',
    readTime: '10分钟',
  },
  {
    id: 4,
    title: '微前端架构落地实践',
    excerpt: '分享在大型项目中落地微前端架构的经验，包括技术选型、架构设计和避坑指南。',
    date: '2023-12-28',
    category: '架构设计',
    readTime: '18分钟',
  },
];

export const contactData: ContactData = {
  email: '0x0886@gmail.com',
  // phone: '+86 138-0000-0000',
  location: '北京 · 朝阳区',
  github: 'https://github.com/xiaoyann',
  linkedin: 'https://linkedin.com/in/zhanghaoran',
  wechat: 'zhanghaoran_dev',
  slogan: '期待与您的合作！',
};
