import { initMenu } from '../menu';

type MediaChangeHandler = (event: { matches: boolean }) => void;

const mediaHandlers: MediaChangeHandler[] = [];

function setupMatchMedia(matches = false) {
  mediaHandlers.length = 0;

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches,
      media: '(min-width: 801px)',
      addEventListener: (_event: string, handler: MediaChangeHandler) => {
        mediaHandlers.push(handler);
      },
      removeEventListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    })),
  });
}

function renderMenu() {
  document.body.innerHTML = `
    <button id="menu-open" aria-expanded="false">Open Menu</button>
    <nav id="main-navigation">
      <button id="menu-close">Close Menu</button>
    </nav>
  `;
  delete document.body.dataset.menuInitialized;
}

describe('initMenu', () => {
  beforeEach(() => {
    document.body.className = '';
    document.body.innerHTML = '';
    delete document.body.dataset.menuInitialized;
    setupMatchMedia();
  });

  it('does not fail when menu controls are missing', () => {
    expect(() => initMenu()).not.toThrow();
  });

  it('opens the menu from the menu-open button', () => {
    renderMenu();
    initMenu();

    document.getElementById('menu-open')?.click();

    expect(document.body).toHaveClass('menu--opened');
    expect(document.getElementById('menu-open')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(document.activeElement).toBe(document.getElementById('menu-close'));
  });

  it('closes the menu from the menu-close button', () => {
    renderMenu();
    initMenu();

    document.getElementById('menu-open')?.click();
    document.getElementById('menu-close')?.click();

    expect(document.body).not.toHaveClass('menu--opened');
    expect(document.getElementById('menu-open')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(document.activeElement).toBe(document.getElementById('menu-open'));
  });

  it('closes the menu with Escape', () => {
    renderMenu();
    initMenu();

    document.getElementById('menu-open')?.click();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(document.body).not.toHaveClass('menu--opened');
  });

  it('closes the menu when switching to desktop breakpoint', () => {
    renderMenu();
    initMenu();

    document.getElementById('menu-open')?.click();
    mediaHandlers.forEach((handler) => {
      handler({ matches: true });
    });

    expect(document.body).not.toHaveClass('menu--opened');
  });

  it('does not register duplicate listeners', () => {
    renderMenu();
    initMenu();
    initMenu();

    document.getElementById('menu-open')?.click();

    expect(document.body).toHaveClass('menu--opened');
    expect(mediaHandlers).toHaveLength(1);
  });
});
