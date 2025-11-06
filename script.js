// ===================== Appear on scroll (fade + blur) =====================
const appearEls = document.querySelectorAll('.appear');
const appearObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      appearObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
appearEls.forEach(el => appearObserver.observe(el));

// ===================== Footer year =====================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===================== Smooth scroll (if nav exists) =====================
const nav = document.querySelector('.nav');
if (nav) {
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ===================== Active nav highlight + auto-hide =====================
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('section');

let lastScrollY = window.pageYOffset;
window.addEventListener('scroll', () => {
  // Active link
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 160;
    const height = section.offsetHeight;
    if (pageYOffset >= top && pageYOffset < top + height) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  // Auto-hide nav
  if (nav) {
    if (window.pageYOffset > lastScrollY) nav.style.top = '-80px';
    else nav.style.top = '18px';
  }
  lastScrollY = window.pageYOffset;
});
