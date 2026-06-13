import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

import type { Config, PageData, PageRaw } from '@/types';

const contentDir = path.join(process.cwd(), 'content');
const pagesDir = path.join(contentDir, 'pages');

export function getGlobalConfig(): Config | null {
  const configPath = path.join(contentDir, 'data', 'config.json');
  if (fs.existsSync(configPath)) {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(fileContents);
  }
  return null;
}

export function getAllPagePaths(): string[] {
  const paths: string[] = [];

  function walkDir(currentPath: string) {
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.md')) {
        let slug = filePath.replace(pagesDir, '').replace(/\.md$/, '');
        if (slug.endsWith('/index')) {
          slug = slug.replace('/index', '/');
        }
        if (slug === '/index') {
          slug = '/';
        }
        paths.push(slug);
      }
    }
  }

  walkDir(pagesDir);
  return paths;
}

export function getPageDataBySlug(slug: string): PageData | null {
  let relativePath = slug;
  if (relativePath === '/' || relativePath === '') {
    relativePath = '/index';
  }
  if (relativePath.endsWith('/')) {
    relativePath = `${relativePath}index`;
  }

  let fullPath = path.join(pagesDir, `${relativePath}.md`);

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(pagesDir, `${relativePath}/index.md`);
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Model name is usually the 'type' field in frontmatter,
  // or we can infer it. If 'type' is not set, we default to 'page'.
  const modelName = data.type || data.layout || 'page';

  return {
    page: {
      ...(data as PageRaw),
      markdown_content: content,
      __metadata: {
        modelName,
        urlPath: slug === '/index' ? '/' : slug,
      },
    },
    site: getGlobalConfig(),
  };
}

export function getAllPagesData(): PageData[] {
  const paths = getAllPagePaths();
  return paths.map((p) => getPageDataBySlug(p)).filter(Boolean);
}
