const menuClass = 'menu--opened';
const initializedKey = 'menuInitialized';

type CloseOptions = {
  restoreFocus?: boolean;
};

function getMenuElements() {
  return {
    body: document.body,
    menuOpen: document.getElementById('menu-open') as HTMLButtonElement | null,
    menuClose: document.getElementById(
      'menu-close',
    ) as HTMLButtonElement | null,
  };
}

function setExpanded(menuOpen: HTMLButtonElement | null, expanded: boolean) {
  menuOpen?.setAttribute('aria-expanded', String(expanded));
}

export function initMenu() {
  const { body, menuOpen, menuClose } = getMenuElements();

  if (body.dataset[initializedKey] === 'true') {
    return;
  }

  if (!menuOpen || !menuClose) {
    return;
  }

  const closeMenu = ({ restoreFocus = true }: CloseOptions = {}) => {
    body.classList.remove(menuClass);
    setExpanded(menuOpen, false);

    if (restoreFocus) {
      menuOpen.focus();
    }
  };

  const openMenu = () => {
    body.classList.add(menuClass);
    setExpanded(menuOpen, true);
    menuClose.focus();
  };

  menuOpen.addEventListener('click', (event) => {
    event.preventDefault();
    openMenu();
  });

  menuClose.addEventListener('click', (event) => {
    event.preventDefault();
    closeMenu();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  if (typeof window.matchMedia !== 'function') {
    body.dataset[initializedKey] = 'true';
    return;
  }

  const desktopMedia = window.matchMedia('(min-width: 801px)');
  const closeOnDesktop = (event: MediaQueryListEvent | MediaQueryList) => {
    if (event.matches) {
      closeMenu({ restoreFocus: false });
    }
  };

  closeOnDesktop(desktopMedia);

  if ('addEventListener' in desktopMedia) {
    desktopMedia.addEventListener('change', closeOnDesktop);
  } else {
    const legacyMedia = desktopMedia as unknown as {
      addListener: (listener: typeof closeOnDesktop) => void;
    };
    legacyMedia.addListener(closeOnDesktop);
  }

  body.dataset[initializedKey] = 'true';
}
