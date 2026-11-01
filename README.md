# byteverse · 个人网站

基于 Vite + React 19 + TypeScript + Tailwind CSS 的个人站点，包含首页作品集与技术日报栏目。

## 本地开发

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # 产物输出到 dist/
npm run typecheck  # tsc --noEmit
npm run lint
```

## 路由结构

| 路径 | 页面 | 说明 |
| --- | --- | --- |
| `/` | 首页 | Hero / 关于 / 技术栈 / 作品集 / 博客 / 最新日报 / 联系 |
| `/daily` | 日报列表 | 按日期倒序，支持关键字搜索、年份与标签筛选、分页加载 |
| `/daily/:slug` | 日报详情 | 完整正文、目录、阅读进度、上下篇、相关推荐 |
| `*` | 404 | 兜底页面 |

站点为 SPA，`public/_redirects` 已配置 `/* /index.html 200`，部署到 Netlify / Cloudflare Pages 时深链接可直接访问。

## 技术日报：内容组织与接入

### 数据来源

日报正文是 **Markdown 文件**，存放在 `src/content/daily/`，一篇一个文件，文件名即 URL slug（建议 `YYYY-MM-DD`）：

```
src/content/daily/
├── 2026-10-28.md
├── 2026-10-29.md
└── 2026-11-01.md
```

- **不需要索引文件**：`src/lib/daily.ts` 用 `import.meta.glob('../content/daily/*.md', { eager: true })` 在构建时扫描目录，新增 `.md` 即自动出现在列表、归档与标签统计里。
- **不需要后端**：所有解析在构建期完成，线上是纯静态资源。
- **版本可追溯**：内容随代码进 Git，`git log src/content/daily/` 就是发布历史。

### 字段定义（frontmatter）

```markdown
---
title: '用 useActionState 干掉手写 loading 状态'   # 必填，标题
date: 2026-11-01                                # 必填，YYYY-MM-DD，用于排序与归档
summary: '一句话摘要，用于列表页与 SEO 描述'      # 可选，缺省时自动取正文首段
tags: [React, 重构, 工程化]                      # 可选，用于筛选与相关推荐
draft: true                                     # 可选，为 true 时构建期过滤掉
---

正文从这里开始，支持 GFM：表格、任务列表、删除线、代码块（带语言标识可高亮语言名）。
```

> 正文开头的 H1 会被自动剥离，避免与详情页标题重复。阅读时长、标签统计、年份归档均由程序计算，无需手填。

### 三种录入方式

**1. 从 WorkBuddy 导出文件导入（推荐）**

在 WorkBuddy 里生成日报 → 导出 Markdown → 执行：

```bash
npm run daily:import -- ~/Downloads/workbuddy-2026-11-02.md
```

脚本会自动完成：去除 BOM / CRLF 归一化 → 补 frontmatter → 从文件名或正文推断日期 → 取首个 H1 作标题并在正文中剥离 → 取首段生成摘要 → 落盘为 `src/content/daily/<日期>.md`。

可选参数：

```bash
npm run daily:import -- ./export.md --date 2026-11-02 --title "标题" --tags 灰度,监控 --summary "摘要"
npm run daily:import -- ./export.md --dry-run   # 只预览解析结果，不落盘
npm run daily:import -- ./export.md --force     # 覆盖同日期文件
```

**2. 手动新建模板**

```bash
npm run daily:new -- 2026-11-02
```

生成带「今日概览 / 进展与细节 / 问题与解决 / 明日计划」骨架的空白模板，直接编辑即可。

**3. 直接写文件**

按上面的字段定义新建 `.md`，保存后 `npm run dev` 立即可见。

### 查看归档

```bash
npm run daily:list
```

### 发布

```bash
npm run build && git add -A && git commit -m "daily: 2026-11-02" && git push
```

构建流水线跑完即上线。

## 新增日报的检查清单

- [ ] 文件名为 `YYYY-MM-DD.md`，与 frontmatter 的 `date` 一致
- [ ] `summary` 控制在 60–100 字，列表页展示更整齐
- [ ] `tags` 复用已有标签，避免标签碎片化
- [ ] 代码块标注语言（` ```ts `），渲染时会显示语言名
- [ ] 表格内容超过 4 列时留意移动端横向滚动体验
