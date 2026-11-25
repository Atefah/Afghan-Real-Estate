// Afghan Real Estate — vanilla JavaScript interactions

// 1. Mobile hamburger menu
const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('.main-nav');

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNavigation.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  mainNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNavigation.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// 2. Dark/light mode
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('afghan-estate-theme');

function applyTheme(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

if (savedTheme) applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('afghan-estate-theme', nextTheme);
  });
}

// 3. Contact form validation and success message
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventEvent;
  });
}
