// ── Desktop dropdowns ──────────────────────────

const navItems = document.querySelectorAll('.nav-item');
const mainNav  = document.getElementById('mainNav');

function positionDropdown(item) {
  const dropdown = item.querySelector('.dropdown');
  if (!dropdown) return;
  dropdown.style.top = mainNav.getBoundingClientRect().bottom + 'px';
}

function openItem(item) {
  navItems.forEach(i => { if (i !== item) closeItem(i); });
  item.classList.add('open');

  const btn = item.querySelector('button[aria-haspopup]');
  if (btn) btn.setAttribute('aria-expanded', 'true');
}

function closeItem(item) {
  item.classList.remove('open');

  const btn = item.querySelector('button[aria-haspopup]');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

navItems.forEach(item => {
  const btn = item.querySelector('button[aria-haspopup]');
  if (!btn) return;

  item.addEventListener('mouseenter', () => {
    positionDropdown(item);
    openItem(item);
  });

  item.addEventListener('mouseleave', () => closeItem(item));

  btn.addEventListener('click', () => {
    item.classList.contains('open')
      ? closeItem(item)
      : (positionDropdown(item), openItem(item));
  });

  btn.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeItem(item);
  });
});

document.addEventListener('click', e => {
  if (!e.target.closest('.nav-item')) {
    navItems.forEach(closeItem);
  }
});