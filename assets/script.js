// Afghan Real Estate — vanilla JavaScript interactions

const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('.main-nav');

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNavigation.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNavigation.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const themeToggle = document.querySelector('.theme-toggle');

function applyTheme(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

applyTheme(localStorage.getItem('afghan-estate-theme') || 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('afghan-estate-theme', nextTheme);
  });
}

const modal = document.querySelector('#property-modal');

function openPropertyModal(card) {
  if (!modal) return;
  document.querySelector('#modal-title').textContent = card.querySelector('h3')?.textContent || '';
  document.querySelector('#modal-image').src = card.querySelector('img')?.src || '';
  document.querySelector('#modal-price').textContent = card.querySelector('.property-price')?.textContent || '';
  document.querySelector('#modal-location').textContent = card.querySelector('.property-location')?.textContent || '';
  document.querySelector('#modal-meta').textContent = [...card.querySelectorAll('.property-meta li')].map((item) => item.textContent).join(' • ');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closePropertyModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.property-card').forEach((card) => {
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.classList.add('is-clickable');
  card.addEventListener('click', () => openPropertyModal(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') openPropertyModal(card);
  });
});

modal?.querySelector('.modal-close')?.addEventListener('click', closePropertyModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closePropertyModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePropertyModal();
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const phone = contactForm.querySelector('#phone');
    const message = contactForm.querySelector('#message');
    let status = contactForm.querySelector('.form-status');

    if (!status) {
      status = document.createElement('p');
      status.className = 'form-status';
      status.setAttribute('role', 'status');
      contactForm.append(status);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.value.trim() || !emailPattern.test(email.value.trim()) || !phone.value.trim() || !message.value.trim()) {
      status.textContent = 'Please complete all fields with a valid email address.';
      status.className = 'form-status form-error';
      return;
    }

    status.textContent = 'Thank you! Your message has been sent successfully.';
    status.className = 'form-status form-success';
    contactForm.reset();
  });
}
