/** Markdown 相关的纯函数：标题锚点、目录提取、纯文本提取 */

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** 中文友好：保留中日韩字符与字母数字，其余转为连字符 */
export function slugifyHeading(text: string, index = 0): string {
  const base = text
    .trim()
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, '')
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return base || `section-${index + 1}`;
}

/**
 * 从 Markdown 正文里提取 H2/H3，忽略代码块内的伪标题。
 * id 只由文字决定（与渲染组件共用同一套规则），保证目录锚点和标题一一对应。
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].replace(/[*_`]/g, '').trim();

    headings.push({ id: slugifyHeading(text, headings.length), text, level });
  }

  return headings;
}

export function plainText(markdown: string, limit?: number): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return typeof limit === 'number' && text.length > limit ? `${text.slice(0, limit)}…` : text;
}
