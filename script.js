const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

menuBtn?.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  mobileNav.hidden = expanded;
});

document.getElementById('year').textContent = String(new Date().getFullYear());

const form = document.getElementById('leadForm');
const toast = document.getElementById('toast');

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  // Demo-only: show a success message.
  toast.hidden = false;

  // Reset after a short delay.
  setTimeout(() => {
    toast.hidden = true;
    form.reset();
  }, 2200);
});


// Hide header on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  // If we recently clicked an anchor link, keep header hidden briefly
  if (Date.now() < lockHiddenUntil) {
    header?.classList.add('header--hidden');
    lastScrollY = currentScroll;
    return;
  }

  if (currentScroll > lastScrollY && currentScroll > 100) {
    header.classList.add('header--hidden');
  } else {
    header.classList.remove('header--hidden');
  }

  lastScrollY = currentScroll;
});


function syncHeaderHeight(){
  const header = document.querySelector('.header');
  if (!header) return;
  const h = header.offsetHeight || 0;
  document.documentElement.style.setProperty('--header-h', `${h}px`);
}

window.addEventListener('load', syncHeaderHeight);
window.addEventListener('resize', syncHeaderHeight);

// Ensure correct offset after logo image loads
const logoImg = document.querySelector('.logo');
logoImg?.addEventListener('load', syncHeaderHeight);


// Hide header when clicking internal section links (e.g., footer/menu anchors)
// This prevents the header from covering section headings after a jump-scroll.
let lockHiddenUntil = 0;

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', () => {
    const header = document.querySelector('.header');
    if (!header) return;

    // Force-hide for a short period even if the jump scroll goes upward
    lockHiddenUntil = Date.now() + 1200;
    header.classList.add('header--hidden');
  });
});
