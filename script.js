'use strict';
document.body.classList.add('js');
const config = {email: 'john.smith@example.com'};
const menuButton = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('menu-open', open);
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    nav.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('menu-open')) {
    nav.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});

const cards = [...document.querySelectorAll('.project-card')];
const filters = [...document.querySelectorAll('.filter')];
function setFilter(kind) {
  cards.forEach(card => { card.hidden = kind !== 'all' && card.dataset.kind !== kind; });
  filters.forEach(button => {
    const selected = button.dataset.filter === kind;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  const count = cards.filter(card => !card.hidden).length;
  document.getElementById('filter-status').textContent = `Showing ${count} ${kind === 'all' ? '' : kind + ' '}projects.`;
}
filters.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
function revealAnchor(hash) {
  if (!hash || hash === '#') return;
  let target;
  try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
  if (target?.classList.contains('project-card') && target.hidden) setFilter('all');
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link) revealAnchor(link.getAttribute('href'));
});
window.addEventListener('hashchange', () => revealAnchor(location.hash));
revealAnchor(location.hash);
if ('IntersectionObserver' in window) {
  const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      sectionLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    }
  }, {rootMargin:'-12% 0px -68% 0px', threshold:0});
  document.querySelectorAll('main>section[id]').forEach(section => observer.observe(section));
}

const form = document.getElementById('contact-form');
const dialog = document.getElementById('draft-dialog');
const draftText = document.getElementById('draft-text');
const emailLink = document.getElementById('open-email');
document.getElementById('display-email').textContent = config.email;
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const email = String(data.get('email')).trim();
  const subject = String(data.get('subject')).trim();
  const message = String(data.get('message')).trim();
  if (!name || !subject || !message) {
    document.getElementById('contact-status').textContent = 'Please enter a name, subject, and message; spaces alone are not enough.';
    return;
  }
  const body = `Hi John,\n\n${message}\n\n${name}\nReply email: ${email}`;
  draftText.value = `To: ${config.email}\nSubject: ${subject}\n\n${body}`;
  document.getElementById('copy-status').textContent = '';
  const sampleAddress = config.email.endsWith('@example.com');
  emailLink.hidden = sampleAddress;
  emailLink.href = `mailto:${encodeURIComponent(config.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  dialog.querySelector('h2+p').textContent = sampleAddress
    ? 'This portfolio currently uses a sample email address. Copy your draft; no message has been sent.'
    : 'Review your draft, then copy it or open your email app. Your message is sent only after you send it from your email app.';
  document.getElementById('contact-status').textContent = 'Draft prepared. No message has been sent.';
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else { dialog.setAttribute('open',''); dialog.scrollIntoView({behavior:'smooth',block:'center'}); }
});
dialog.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => {
  if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
}));
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  }
});
document.getElementById('copy-draft').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(draftText.value);
    document.getElementById('copy-status').textContent = 'Draft copied. No message has been sent.';
  } catch {
    draftText.focus();
    draftText.select();
    document.getElementById('copy-status').textContent = 'Draft selected. Use your device’s Copy command to copy it.';
  }
});
