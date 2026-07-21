function initMenu() {
  const menuOpen = document.getElementById('menu-open');
  const menuClose = document.getElementById('menu-close');
  const body = document.body;

  if (menuOpen) {
    menuOpen.addEventListener('click', (e) => {
      e.preventDefault();
      body.classList.toggle('menu--opened');
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', (e) => {
      e.preventDefault();
      body.classList.remove('menu--opened');
    });
  }

  window.addEventListener(
    'resize',
    () => {
      const menuOpenEl = document.getElementById('menu-open');
      if (menuOpenEl && menuOpenEl.offsetParent === null) {
        body.classList.remove('menu--opened');
      }
    },
    true,
  );
}

document.addEventListener('DOMContentLoaded', initMenu);
