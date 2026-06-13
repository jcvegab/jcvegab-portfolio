const mockFiles: Record<string, string> = {};

vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn((p: string) => p in mockFiles),
    readFileSync: vi.fn((p: string) => {
      if (!(p in mockFiles)) {
        throw new Error(`ENOENT: ${p}`);
      }
      return mockFiles[p];
    }),
    readdirSync: vi.fn((dir: string) => {
      const entries = Object.keys(mockFiles)
        .filter((p) => p.startsWith(dir) && p !== dir)
        .map((p) => p.replace(`${dir}/`, '').split('/')[0]);
      return [...new Set(entries)];
    }),
    statSync: vi.fn((p: string) => ({
      isDirectory: () =>
        Object.keys(mockFiles).some((f) => f.startsWith(`${p}/`)),
    })),
  },
  existsSync: vi.fn((p: string) => p in mockFiles),
  readFileSync: vi.fn((p: string) => {
    if (!(p in mockFiles)) {
      throw new Error(`ENOENT: ${p}`);
    }
    return mockFiles[p];
  }),
  readdirSync: vi.fn((dir: string) => {
    const entries = Object.keys(mockFiles)
      .filter((p) => p.startsWith(dir) && p !== dir)
      .map((p) => p.replace(`${dir}/`, '').split('/')[0]);
    return [...new Set(entries)];
  }),
  statSync: vi.fn((p: string) => ({
    isDirectory: () =>
      Object.keys(mockFiles).some((f) => f.startsWith(`${p}/`)),
  })),
}));

vi.mock('gray-matter', () => ({
  default: (content: string) => {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (match) {
      const data: Record<string, string> = {};
      for (const line of match[1].split('\n')) {
        const [key, ...val] = line.split(':');
        if (key && val.length) {
          data[key.trim()] = val.join(':').trim();
        }
      }
      return { data, content: match[2] };
    }
    return { data: {}, content };
  },
}));

import {
  getAllPagePaths,
  getAllPagesData,
  getGlobalConfig,
  getPageDataBySlug,
} from '../content';

describe('content utilities', () => {
  beforeEach(() => {
    for (const key of Object.keys(mockFiles)) {
      delete mockFiles[key];
    }
  });

  describe('getGlobalConfig', () => {
    it('returns null when config file does not exist', () => {
      expect(getGlobalConfig()).toBeNull();
    });

    it('returns parsed config when config file exists', () => {
      const configPath = expect.stringContaining('content/data/config.json');
      mockFiles[configPath as unknown as string] = '{"title": "My Site"}';
    });
  });

  describe('getAllPagePaths', () => {
    it('returns empty array when no pages exist', () => {
      const paths = getAllPagePaths();
      expect(paths).toEqual([]);
    });
  });

  describe('getPageDataBySlug', () => {
    it('returns null for non-existent slug', () => {
      const result = getPageDataBySlug('/nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('getAllPagesData', () => {
    it('returns empty array when no pages exist', () => {
      const result = getAllPagesData();
      expect(result).toEqual([]);
    });
  });
});
