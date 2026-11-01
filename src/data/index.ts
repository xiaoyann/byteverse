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
  /** 要点式成果，替代整段文字，便于扫读 */
  highlights?: string[];
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
  crossEnd: Skill[];
  toolchain: Skill[];
  performance: Skill[];
  ai: Skill[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  role: string;
  period: string;
  /** 项目要解决的工程问题 */
  background: string;
  /** 本人承担的核心工作 */
  actions: string[];
  metrics: ProjectMetric[];
  tags: string[];
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
  status: string;
  slogan: string;
}

export const heroData: HeroData = {
  name: 'XF',
  title: '资深前端架构工程师',
  subtitle: '12 年研发经验 · 跨端框架 / 编译工具链 / 性能工程',
  description:
    '近 9 年专注跨端容器与前端基础设施：设计过同时支持 RN、Native、WebView 的虚拟 DOM 架构，主导过 iOS / Android / 鸿蒙三端统一构建发布工具链，把编译打包提速 70%～90%。',
  highlights: ['跨端框架', '构建工具链', '性能工程', 'AI Coding'],
};

export const aboutData: AboutData = {
  bio: '2014 年入行，从 PHP 服务端做起，随后转入前端。经历覆盖业务研发、React Native 跨端 App、前端团队管理，最终落在大型互联网跨端基础设施建设上。近 9 年专注跨端容器框架、编译构建工具链与开发者工具，参与过三代跨端框架的演进，也负责过前端方向的技术规划与团队培养。比起堆砌名词，更在意框架在真实业务里能不能跑得更快、更稳。',
  experiences: [
    {
      company: '美团',
      role: '前端技术专家 · 终端基础技术方向',
      period: '2017.12 - 2026.09',
      description:
        '负责跨端容器框架、前端运行时、编译构建工具链与开发者工具研发。先后参与三代跨端框架建设，担任统一容器框架前端侧主负责人、React Native 框架团队前端方向负责人。',
      highlights: [
        '跨端统一容器：设计并实现支持 RN / Native / WebView 三种渲染模式的核心虚拟 DOM 架构',
        '构建工具链：主导 RN 新架构下 iOS / Android / 鸿蒙三端统一的打包、发布与调试体系',
        '性能工程：编译打包提速 70%～90%，试点业务包体积下降约 65%，包注入耗时从 812ms 降至 125ms',
      ],
    },
    {
      company: '北京波巴布',
      role: '前端方向负责人',
      period: '2016.11 - 2017.12',
      description:
        '负责前端团队建设、技术选型、开发规范与工程化体系，覆盖 PC 站点、移动 WebApp、H5 活动页与原生 App 多种业务形态。',
      highlights: [
        '团队从 2 人扩到 5 人，负责招聘、培养与技术指导',
        '基于 vue-cli 建设两套项目初始化模板，引入 ESLint + pre-commit 管控代码质量',
        '提炼移动端通用 UI 组件库，沉淀需求评审到线上监控的完整研发流程',
      ],
    },
    {
      company: '北京蜜蜂汇金',
      role: '前端开发工程师',
      period: '2014.10 - 2016.11',
      description:
        '负责 PC 网站、移动 WebApp 与 React Native App 研发，推动前端从 jQuery 时代迁移到组件化、模块化的现代工程体系。',
      highlights: [
        '技术栈从 Backbone + FIS + jQuery 演进到 ES6 + React/Vue + Webpack',
        '在 RN 发布早期完成技术调研并落地到真实 App，独立开发 iOS 端 30+ 页面',
        '自学 iOS 原生开发，封装微信 SDK 的 RN 集成能力，解决跨端与原生 SDK 的桥接问题',
      ],
    },
    {
      company: '楚楚街',
      role: 'PHP 开发工程师',
      period: '2014.01 - 2014.10',
      description:
        '互联网行业的第一份研发工作，负责电商服务端业务开发，参与主站、淘宝 U 站、商家活动发布系统与商城系统。',
      highlights: ['主导退款退货全链路流程设计与实现', '参与淘宝商品数据迁移系统开发'],
      award: '月度优秀员工奖',
      awardImage: '/IMG_0146.JPG',
    },
  ],
  stats: [
    { label: '研发年限', value: '12', suffix: '年+' },
    { label: '跨端框架', value: '3', suffix: '代' },
    { label: '核心项目', value: '5', suffix: '个' },
    { label: '覆盖终端', value: '3', suffix: '端' },
  ],
};

export const skillsData: SkillsData = {
  crossEnd: [
    { name: 'React Native', level: 92, icon: 'React' },
    { name: '虚拟 DOM / 渲染架构', level: 92, icon: 'Render' },
    { name: '小程序运行时', level: 88, icon: 'MiniProgram' },
    { name: 'React', level: 88, icon: 'React' },
    { name: 'Vue', level: 85, icon: 'Vue' },
    { name: 'Native Bridge / JSI', level: 80, icon: 'Bridge' },
    { name: 'Hybrid / WebView', level: 85, icon: 'WebView' },
    { name: '鸿蒙适配', level: 75, icon: 'Harmony' },
  ],
  toolchain: [
    { name: 'Metro', level: 90, icon: 'Metro' },
    { name: 'Babel', level: 88, icon: 'Babel' },
    { name: 'Hermes', level: 85, icon: 'Hermes' },
    { name: 'Webpack / Vite', level: 85, icon: 'Webpack' },
    { name: 'Node.js / CLI', level: 88, icon: 'NodeJS' },
    { name: 'pnpm / Monorepo', level: 82, icon: 'Pnpm' },
    { name: 'CI/CD', level: 85, icon: 'CI' },
    { name: '自动化测试', level: 80, icon: 'Test' },
  ],
  performance: [
    { name: '启动性能优化', level: 92, icon: 'Launch' },
    { name: '渲染性能优化', level: 90, icon: 'Render' },
    { name: '包体积治理', level: 90, icon: 'Bundle' },
    { name: '编译构建提速', level: 90, icon: 'Build' },
    { name: 'JS 引擎调优', level: 82, icon: 'Engine' },
    { name: '性能监控与归因', level: 85, icon: 'Monitor' },
    { name: '稳定性治理', level: 82, icon: 'Stability' },
    { name: '低端机适配', level: 85, icon: 'Device' },
  ],
  ai: [
    { name: 'TypeScript', level: 90, icon: 'TypeScript' },
    { name: 'JavaScript', level: 95, icon: 'JavaScript' },
    { name: 'Node.js', level: 88, icon: 'NodeJS' },
    { name: 'PHP', level: 75, icon: 'PHP' },
    { name: 'AI 辅助编程', level: 85, icon: 'AI' },
    { name: 'Coding Agent', level: 78, icon: 'Agent' },
    { name: '开发者工具自动化', level: 85, icon: 'Tooling' },
  ],
};

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: '跨端统一容器框架',
    role: '前端侧主负责人',
    period: '2021.11 - 2023',
    background:
      '公司内多套动态化方案并存，需要建设一个统一容器，同时承载小程序与 React Native 两套技术体系与混合开发场景。',
    actions: [
      '主导核心虚拟 DOM 架构设计与实现，支持两套 DSL 及混写',
      '设计 Native 渲染指令生成机制与跨端通信方案',
      '实现 RN / Native / WebView 三种渲染模式的前端核心能力',
      '推动自动化测试体系，支持新旧框架测试用例复用',
    ],
    metrics: [
      { label: '业务包体积', value: '-65%' },
      { label: '综合可用性', value: '99.8%' },
      { label: '自动化用例', value: '800+' },
    ],
    tags: ['虚拟 DOM', '跨端渲染', 'RN', '小程序'],
  },
  {
    id: 2,
    title: 'RN 新架构三端构建发布工具链',
    role: '方案设计与开发负责人',
    period: '2025.10 - 2026.06',
    background:
      'RN 升级到 0.82 新架构后，需要把 iOS、Android、鸿蒙三端的构建发布体系统一起来，并支持 Hermes 字节码与新的 JavaScript 标准基线。',
    actions: [
      '主导打包、发布、调试工具链的升级方案与开发',
      '推进 ES2021 标准基线升级，验证不同 JS 引擎的兼容性',
      '实现 Hermes 字节码编译打包，优化 Bundle 加载与执行',
      '将鸿蒙独立构建工具整合进统一 CLI，一套代码三端发布',
    ],
    metrics: [
      { label: 'Bundle 体积', value: '-13.8%' },
      { label: '包注入耗时', value: '812→125ms' },
      { label: '启动 TP50', value: '-50~80%' },
    ],
    tags: ['Hermes', 'Metro', '鸿蒙', 'CLI'],
  },
  {
    id: 3,
    title: '静态渲染与低端机性能优化',
    role: '前端方案负责人',
    period: '2024 - 2025',
    background:
      '低端机页面加载体验差，传统 RN 渲染流程启动成本高，需要一套更轻量的静态渲染方案。',
    actions: [
      '设计轻量级 DSL 解析、数据绑定与模板执行机制',
      '从 Bundle 加载复用、线程调度、Yoga 布局、ViewTree 缓存四个方向优化',
      '通过编译时转换扩展 DSL 能力，控制基础库体积',
      '建设渲染差异分析工具与业务接入方案',
    ],
    metrics: [
      { label: 'Android 低端机 C 指标', value: '8.74→63' },
      { label: 'iOS 对应指标', value: '17→54' },
      { label: '页面接入', value: '27 个' },
    ],
    tags: ['静态渲染', 'Yoga', '低端机', 'DSL 编译'],
  },
  {
    id: 4,
    title: '小程序框架编译与性能专项',
    role: '性能优化主 R / 工具链核心开发',
    period: '2019 - 2021',
    background:
      '小程序框架在业务规模化后暴露出编译慢、首包大、首屏慢三类问题，需要在框架与工具链两侧同时治理。',
    actions: [
      '主导虚拟 DOM 核心机制重构，优化节点 Diff 与数据更新流程',
      '设计分包加载、预加载、主包拆分、内置组件按需加载能力',
      '推进编译工具与基础库解耦，实现独立发版',
      '独立设计开发首版真机性能分析工具',
    ],
    metrics: [
      { label: '编译打包速度', value: '+70~90%' },
      { label: '首次下载包', value: '-50%' },
      { label: '首屏时间', value: '5.5s→3.6s' },
    ],
    tags: ['分包加载', '编译缓存', '性能分析工具'],
  },
  {
    id: 5,
    title: '三端统一 Debug 面板与容器 CLI',
    role: '方案与核心开发负责人',
    period: '2026.01 - 2026.06',
    background:
      '三个容器各自维护一套调试工具，命令与接口互不相同，业务排障成本高，需要统一调试协议与 CLI 能力。',
    actions: [
      '主导三端统一 Debug 面板架构、调试协议与核心功能',
      '设计引擎管理、网络调试、业务包管理、环境切换等能力',
      '梳理三大容器约 50 项 CLI 命令，制定统一能力与接口协议',
      '用 AI 辅助开发与自动化测试 Skill 提升验证效率',
    ],
    metrics: [
      { label: '调试功能', value: '20+ 项' },
      { label: '单命令耗时', value: '10s→2s' },
      { label: '代码形态', value: '三端一套' },
    ],
    tags: ['调试协议', 'CLI', '开发者工具', 'AI 辅助'],
  },
];

/** 首页已改为展示技术日报，旧博客占位数据已清空（组件保留，便于恢复） */
export const blogData: BlogPost[] = [];

export const contactData: ContactData = {
  email: '0x0886@gmail.com',
  location: '北京 · 朝阳区',
  github: 'https://github.com/xiaoyann',
  status: '开放远程机会 · 前端架构 / 工程效能 / 开发者工具 / AI Coding',
  slogan: '期待与您的合作！',
};
