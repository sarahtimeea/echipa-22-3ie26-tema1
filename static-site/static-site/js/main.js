// ========== AromaCraft Coffee — Main JS ==========

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initContactForm();
});

/* ---------- Sticky Header ---------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

/* ---------- Contact Form Validation ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    let valid = true;

    if (!name) {
      showError('name', 'Numele este obligatoriu.');
      valid = false;
    }

    if (!email) {
      showError('email', 'Email-ul este obligatoriu.');
      valid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Adresa de email nu este validă.');
      valid = false;
    }

    if (!message) {
      showError('message', 'Mesajul este obligatoriu.');
      valid = false;
    }

    if (valid) {
      showFormMessage('success', '✓ Mesajul a fost trimis cu succes! Îți mulțumim.');
      form.reset();
    }
  });
}

function showError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.add('error');
  const errorEl = document.createElement('p');
  errorEl.className = 'error-text';
  errorEl.textContent = msg;
  field.parentElement.appendChild(errorEl);
}

function clearErrors() {
  document.querySelectorAll('.error-text').forEach(el => el.remove());
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  const msgEl = document.querySelector('.form-message');
  if (msgEl) msgEl.remove();
}

function showFormMessage(type, msg) {
  const form = document.getElementById('contactForm');
  const div = document.createElement('div');
  div.className = 'form-message ' + (type === 'success' ? 'success' : 'error-msg');
  div.textContent = msg;
  form.appendChild(div);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
