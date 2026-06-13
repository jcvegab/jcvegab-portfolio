import * as utilsIndex from '../index';

describe('utils index', () => {
  it('exports classNames', () => {
    expect(utilsIndex.classNames).toBeDefined();
  });

  it('exports formatDate', () => {
    expect(utilsIndex.formatDate).toBeDefined();
  });

  it('exports getPageUrl', () => {
    expect(utilsIndex.getPageUrl).toBeDefined();
  });

  it('exports htmlToReact', () => {
    expect(utilsIndex.htmlToReact).toBeDefined();
  });

  it('exports Link', () => {
    expect(utilsIndex.Link).toBeDefined();
  });

  it('exports markdownify', () => {
    expect(utilsIndex.markdownify).toBeDefined();
  });

  it('exports withPrefix', () => {
    expect(utilsIndex.withPrefix).toBeDefined();
  });

  it('exports lodash utilities', () => {
    expect(utilsIndex.camelCase).toBeDefined();
    expect(utilsIndex.compact).toBeDefined();
    expect(utilsIndex.get).toBeDefined();
    expect(utilsIndex.isEmpty).toBeDefined();
    expect(utilsIndex.map).toBeDefined();
    expect(utilsIndex.omit).toBeDefined();
    expect(utilsIndex.orderBy).toBeDefined();
    expect(utilsIndex.size).toBeDefined();
    expect(utilsIndex.startsWith).toBeDefined();
    expect(utilsIndex.trim).toBeDefined();
    expect(utilsIndex.trimStart).toBeDefined();
    expect(utilsIndex.upperFirst).toBeDefined();
  });
});
