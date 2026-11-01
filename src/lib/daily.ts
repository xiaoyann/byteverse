/**
 * 技术日报数据层
 *
 * 数据来源：src/content/daily/*.md（带 YAML frontmatter 的 Markdown）
 * 发现方式：Vite 的 import.meta.glob 在构建时静态收集，无需手工维护索引文件。
 * 因此「新增一篇日报 = 新增一个 .md 文件」，推送到仓库后自动出现在列表页。
 */

export interface DailyPost {
  /** URL 片段，等于文件名（不含 .md），推荐用日期 2026-11-01 */
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  tags: string[];
  /** 正文 Markdown（已剥离 frontmatter 与首行 H1） */
  content: string;
  readingMinutes: number;
}

type FrontmatterValue = string | string[];
type Frontmatter = Record<string, FrontmatterValue>;

const rawModules = import.meta.glob('../content/daily/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/* ------------------------------------------------------------------ */
/* frontmatter 解析                                                    */
/* ------------------------------------------------------------------ */

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const normalized = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(normalized);

  if (!match) {
    return { data: {}, body: normalized.trim() };
  }

  const data: Frontmatter = {};
  let currentKey: string | null = null;

  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    // 数组写法：- foo
    const listItem = /^\s*-\s+(.*)$/.exec(line);
    if (listItem && currentKey) {
      const value = unquote(listItem[1]);
      const prev = data[currentKey];
      if (Array.isArray(prev)) prev.push(value);
      else if (typeof prev === 'string' && prev) data[currentKey] = [prev, value];
      else data[currentKey] = [value];
      continue;
    }

    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;

    const key = kv[1];
    const value = kv[2].trim();
    currentKey = key;

    if (!value) {
      data[key] = [];
    } else if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => unquote(item))
        .filter(Boolean);
    } else {
      data[key] = unquote(value);
    }
  }

  return { data, body: normalized.slice(match[0].length).trim() };
}

/* ------------------------------------------------------------------ */
/* 工具函数                                                            */
/* ------------------------------------------------------------------ */

function asString(value: FrontmatterValue | undefined, fallback = ''): string {
  if (Array.isArray(value)) return value.join(' ').trim();
  return (value ?? '').trim() || fallback;
}

function asTags(value: FrontmatterValue | undefined): string[] {
  if (Array.isArray(value)) return value.map((tag) => tag.trim()).filter(Boolean);
  if (typeof value === 'string' && value) {
    return value
      .split(/[,，、]/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

/** 中文按字计、英文按词计、代码按字符慢速计，取一个粗略的阅读时长 */
function estimateReadingMinutes(content: string): number {
  const codeChars = (content.match(/```[\s\S]*?```/g) ?? []).join('').length;
  const plain = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, ' ');
  const cjk = (plain.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  const latin = (plain.replace(/[\u4e00-\u9fa5]/g, ' ').match(/[A-Za-z0-9_][A-Za-z0-9_-]*/g) ?? []).length;

  // 代码块按 600 字符/分钟折算，避免「一段代码很多的文章只显示 1 分钟」
  return Math.max(1, Math.round(cjk / 300 + latin / 200 + codeChars / 600));
}

/** 去掉正文开头的 H1，避免和详情页标题重复 */
function stripLeadingTitle(body: string, title: string): string {
  const lines = body.split('\n');
  const firstIndex = lines.findIndex((line) => line.trim());
  if (firstIndex === -1) return body;

  const first = lines[firstIndex].trim();
  if (!first.startsWith('# ')) return body;

  const heading = first.replace(/^#\s+/, '').trim();
  const sameAsTitle = heading === title || title.includes(heading) || heading.includes(title);
  if (!sameAsTitle) return body;

  lines.splice(firstIndex, 1);
  return lines.join('\n').trim();
}

/** 没有 summary 时，从正文取第一段作为摘要 */
function deriveSummary(content: string, limit = 96): string {
  const paragraph = content
    .split('\n')
    .map((line) => line.trim())
    .find(
      (line) =>
        line.length > 12 &&
        !line.startsWith('#') &&
        !line.startsWith('>') &&
        !line.startsWith('|') &&
        !line.startsWith('-') &&
        !line.startsWith('```') &&
        !/^\d+\./.test(line),
    );

  if (!paragraph) return '';
  const plain = paragraph
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .trim();

  return plain.length > limit ? `${plain.slice(0, limit)}…` : plain;
}

/* ------------------------------------------------------------------ */
/* 数据装载                                                            */
/* ------------------------------------------------------------------ */

function toPost(path: string, raw: string): DailyPost | null {
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? '';
  if (!slug) return null;

  const { data, body } = parseFrontmatter(raw);
  const date = asString(data.date, slug.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? '');
  const title = asString(data.title, `${date} 技术日报`);
  const content = stripLeadingTitle(body, title);

  return {
    slug,
    title,
    date,
    summary: asString(data.summary) || deriveSummary(content),
    tags: asTags(data.tags),
    content,
    readingMinutes: estimateReadingMinutes(content),
  };
}

/** 全部日报，按日期倒序（同日按 slug 倒序） */
export const dailyPosts: DailyPost[] = Object.entries(rawModules)
  .filter(([, raw]) => !/^\s*draft\s*:\s*true/m.test(raw))
  .map(([path, raw]) => toPost(path, raw))
  .filter((post): post is DailyPost => post !== null && Boolean(post.date))
  .sort((a, b) => (a.date === b.date ? b.slug.localeCompare(a.slug) : b.date.localeCompare(a.date)));

export function getDailyPost(slug: string): DailyPost | undefined {
  return dailyPosts.find((post) => post.slug === slug);
}

/** 相邻文章：older = 更早一篇，newer = 更新一篇 */
export function getAdjacentPosts(slug: string): {
  older?: DailyPost;
  newer?: DailyPost;
} {
  const index = dailyPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return {
    newer: index > 0 ? dailyPosts[index - 1] : undefined,
    older: index < dailyPosts.length - 1 ? dailyPosts[index + 1] : undefined,
  };
}

export function getRelatedPosts(post: DailyPost, limit = 3): DailyPost[] {
  const scored = dailyPosts
    .filter((item) => item.slug !== post.slug)
    .map((item) => ({
      post: item,
      score: item.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date));

  return scored.slice(0, limit).map((item) => item.post);
}

/* ------------------------------------------------------------------ */
/* 聚合 / 归档                                                         */
/* ------------------------------------------------------------------ */

export interface TagStat {
  tag: string;
  count: number;
}

export function collectTags(posts: DailyPost[] = dailyPosts): TagStat[] {
  const counter = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    }
  }
  return [...counter.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export interface YearGroup {
  year: string;
  posts: DailyPost[];
}

/** 按年份分组，用于列表页归档与侧边栏 */
export function groupByYear(posts: DailyPost[]): YearGroup[] {
  const groups = new Map<string, DailyPost[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    const bucket = groups.get(year);
    if (bucket) bucket.push(post);
    else groups.set(year, [post]);
  }
  return [...groups.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, items]) => ({ year, posts: items }));
}

export function filterPosts(
  posts: DailyPost[],
  options: { keyword?: string; tag?: string | null; year?: string | null } = {},
): DailyPost[] {
  const keyword = options.keyword?.trim().toLowerCase() ?? '';
  const tag = options.tag ?? null;
  const year = options.year ?? null;

  return posts.filter((post) => {
    if (tag && !post.tags.includes(tag)) return false;
    if (year && !post.date.startsWith(year)) return false;
    if (!keyword) return true;
    const haystack = `${post.title} ${post.summary} ${post.tags.join(' ')} ${post.content}`.toLowerCase();
    return haystack.includes(keyword);
  });
}

/* ------------------------------------------------------------------ */
/* 格式化                                                              */
/* ------------------------------------------------------------------ */

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

function parseDate(date: string): Date | null {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!parts) return null;
  return new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
}

/** 2026年11月1日 */
export function formatDate(date: string): string {
  const value = parseDate(date);
  if (!value) return date;
  return `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日`;
}

/** 11月1日 周日 */
export function formatDateWithWeekday(date: string): string {
  const value = parseDate(date);
  if (!value) return date;
  return `${value.getMonth() + 1}月${value.getDate()}日 ${WEEKDAYS[value.getDay()]}`;
}

/** 11.01 */
export function formatDayMonth(date: string): string {
  const value = parseDate(date);
  if (!value) return date;
  return `${String(value.getMonth() + 1).padStart(2, '0')}.${String(value.getDate()).padStart(2, '0')}`;
}

export function getWeekday(date: string): string {
  const value = parseDate(date);
  return value ? WEEKDAYS[value.getDay()] : '';
}

export function getDay(date: string): string {
  const value = parseDate(date);
  return value ? String(value.getDate()).padStart(2, '0') : '';
}

export function getMonthLabel(date: string): string {
  const value = parseDate(date);
  return value ? `${value.getMonth() + 1}月` : '';
}

export const dailyStats = {
  total: dailyPosts.length,
  tags: collectTags().length,
  latest: dailyPosts[0]?.date ?? '',
  first: dailyPosts[dailyPosts.length - 1]?.date ?? '',
};
