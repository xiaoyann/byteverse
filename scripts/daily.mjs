#!/usr/bin/env node
/**
 * 技术日报内容工具
 *
 *   npm run daily:new -- 2026-11-02            生成空白模板（手动录入）
 *   npm run daily:import -- ~/Downloads/x.md   导入 WorkBuddy 导出的 Markdown
 *   npm run daily:list                         查看现有日报归档
 *
 * 导入时可选参数：
 *   --date 2026-11-02   覆盖日期
 *   --title "标题"      覆盖标题
 *   --tags React,性能   覆盖标签（逗号分隔）
 *   --summary "摘要"    覆盖摘要
 *   --force             同名文件已存在时覆盖（默认保留不覆盖）
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'daily');
const DEFAULT_TAGS = ['技术日报'];

/* ---------------------------------- utils --------------------------------- */

const pad = (value) => String(value).padStart(2, '0');

function today() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function isDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value ?? '');
}

function normalize(text) {
  return text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function parseArgs(argv) {
  const positional = [];
  const flags = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      positional.push(arg);
      continue;
    }
    const key = arg.slice(2);
    if (key === 'force' || key === 'dry-run') {
      flags[key] = true;
      continue;
    }
    const value = argv[i + 1];
    if (value === undefined || value.startsWith('--')) {
      flags[key] = true;
      continue;
    }
    flags[key] = value;
    i += 1;
  }

  return { positional, flags };
}

/** 拆分并解析 frontmatter（只支持本栏目用到的简单 YAML 子集） */
function splitFrontmatter(raw) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data = {};
  let key = null;

  for (const line of match[1].split('\n')) {
    const listItem = /^\s*-\s+(.*)$/.exec(line);
    if (listItem && key) {
      const value = listItem[1].replace(/^['"]|['"]$/g, '').trim();
      data[key] = Array.isArray(data[key]) ? [...data[key], value] : value ? [data[key], value] : [value];
      continue;
    }

    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;

    key = kv[1];
    const value = kv[2].trim().replace(/^['"]|['"]$/g, '');

    if (!value) {
      data[key] = [];
    } else if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      data[key] = value;
    }
  }

  return { data, body: raw.slice(match[0].length).trim() };
}

function inferDate({ flags, data, body, filename }) {
  if (isDate(flags.date)) return flags.date;
  if (isDate(data.date)) return data.date;

  const fromFilename = /(\d{4})-(\d{2})-(\d{2})/.exec(filename);
  if (fromFilename) return fromFilename[0];

  const fromBody = /(\d{4})[-/年](\d{1,2})[-/月](\d{1,2})/.exec(body);
  if (fromBody) {
    return `${fromBody[1]}-${pad(fromBody[2])}-${pad(fromBody[3])}`;
  }

  return today();
}

function inferTitle({ flags, data, body }) {
  if (typeof flags.title === 'string') return flags.title.trim();
  if (typeof data.title === 'string' && data.title.trim()) return data.title.trim();

  const h1 = /^#\s+(.+)$/m.exec(body);
  if (h1) return h1[1].replace(/[*_`]/g, '').trim();

  return `${today()} 技术日报`;
}

function stripLeadingH1(body, title) {
  const lines = body.split('\n');
  const index = lines.findIndex((line) => line.trim());
  if (index === -1) return body.trim();
  if (!/^#\s+/.test(lines[index].trim())) return body.trim();

  const heading = lines[index].replace(/^#\s+/, '').replace(/[*_`]/g, '').trim();
  if (heading !== title) return body.trim();

  lines.splice(index, 1);
  return lines.join('\n').trim();
}

function inferSummary({ flags, data, body }) {
  if (typeof flags.summary === 'string') return flags.summary.trim();
  if (typeof data.summary === 'string' && data.summary.trim()) return data.summary.trim();

  const paragraph = body
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

  return plain.length > 96 ? `${plain.slice(0, 96)}…` : plain;
}

function inferTags({ flags, data }) {
  if (typeof flags.tags === 'string') {
    return flags.tags
      .split(/[,，、]/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  if (Array.isArray(data.tags)) return data.tags;
  if (typeof data.tags === 'string' && data.tags) {
    return data.tags
      .split(/[,，、]/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return DEFAULT_TAGS;
}

function buildFrontmatter({ title, date, summary, tags }) {
  const quoted = (value) => `'${String(value).replace(/'/g, "''")}'`;
  return [
    '---',
    `title: ${quoted(title)}`,
    `date: ${date}`,
    `summary: ${quoted(summary)}`,
    `tags: [${tags.join(', ')}]`,
    '---',
    '',
  ].join('\n');
}

function ensureContentDir() {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

/* --------------------------------- commands -------------------------------- */

function importCommand({ positional, flags }) {
  const source = positional[0];
  if (!source) {
    console.error('用法: npm run daily:import -- <path/to/export.md> [--date YYYY-MM-DD] [--tags a,b]');
    process.exit(1);
  }

  const sourcePath = path.resolve(source.replace(/^~/, process.env.HOME ?? '~'));
  if (!fs.existsSync(sourcePath)) {
    console.error(`找不到文件: ${sourcePath}`);
    process.exit(1);
  }

  const raw = normalize(fs.readFileSync(sourcePath, 'utf8'));
  const { data, body } = splitFrontmatter(raw);
  const filename = path.basename(sourcePath);

  const date = inferDate({ flags, data, body, filename });
  const title = inferTitle({ flags, data, body });
  const summary = inferSummary({ flags, data, body });
  const tags = inferTags({ flags, data });
  const content = stripLeadingH1(body, title);

  if (content.length < 40) {
    console.error('正文过短（少于 40 字），可能导出内容为空，已中止。');
    process.exit(1);
  }

  ensureContentDir();
  const targetPath = path.join(CONTENT_DIR, `${date}.md`);
  const exists = fs.existsSync(targetPath);

  if (exists && !flags.force) {
    console.error(`已存在 ${path.relative(ROOT, targetPath)}，如需覆盖请加 --force`);
    process.exit(1);
  }

  const output = `${buildFrontmatter({ title, date, summary, tags })}\n${content}\n`;

  if (flags['dry-run']) {
    console.log('--- 预览（未写入） ---');
    console.log(output.slice(0, 600));
    console.log('...');
    return;
  }

  fs.writeFileSync(targetPath, output, 'utf8');

  console.log(`✓ 已写入 ${path.relative(ROOT, targetPath)}`);
  console.log(`  日期: ${date}`);
  console.log(`  标题: ${title}`);
  console.log(`  标签: ${tags.join(', ') || '(无)'}`);
  console.log(`  摘要: ${summary || '(空)'}`);
  console.log(`  正文: ${content.length} 字符`);
  console.log('\n下一步: npm run dev 本地预览，或 git commit 后发布。');
}

function newCommand({ positional }) {
  const date = isDate(positional[0]) ? positional[0] : today();
  ensureContentDir();

  const targetPath = path.join(CONTENT_DIR, `${date}.md`);
  if (fs.existsSync(targetPath)) {
    console.error(`已存在 ${path.relative(ROOT, targetPath)}，请直接编辑该文件。`);
    process.exit(1);
  }

  const template = `${buildFrontmatter({
    title: `${date} 技术日报`,
    date,
    summary: '用一句话概括今天的核心进展。',
    tags: DEFAULT_TAGS,
  })}
## 今日概览

今天做了什么、结论是什么，用两三句话讲清楚。

## 进展与细节

- 具体改动
- 关键数据

## 问题与解决

> 遇到的问题和最终的处理方式。

## 明日计划

1. 第一件事
2. 第二件事
`;

  fs.writeFileSync(targetPath, template, 'utf8');
  console.log(`✓ 已创建模板 ${path.relative(ROOT, targetPath)}`);
  console.log('编辑完成后运行 npm run dev 预览。');
}

function listCommand() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('内容目录尚未创建，先运行 npm run daily:new');
    return;
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.log('暂无日报，运行 npm run daily:new 开始第一篇。');
    return;
  }

  console.log(`共 ${files.length} 篇日报：\n`);
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data } = splitFrontmatter(normalize(raw));
    const title = Array.isArray(data.title) ? data.title.join(' ') : data.title;
    console.log(`  ${file.replace(/\.md$/, '')}  ${title ?? '(无标题)'}`);
  }
}

/* ---------------------------------- main ---------------------------------- */

const [, , command = 'help', ...rest] = process.argv;
const parsed = parseArgs(rest);

switch (command) {
  case 'import':
    importCommand(parsed);
    break;
  case 'new':
    newCommand(parsed);
    break;
  case 'list':
    listCommand();
    break;
  default:
    console.log(`技术日报内容工具

  npm run daily:new -- 2026-11-02            生成空白模板（手动录入）
  npm run daily:import -- <file.md>          导入 WorkBuddy 导出的 Markdown
  npm run daily:list                         查看现有归档

导入参数: --date --title --tags --summary --force --dry-run`);
}
