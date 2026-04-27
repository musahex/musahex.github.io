const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('.desktop-nav a');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const sections = document.querySelectorAll('section[id]');
const reveals = document.querySelectorAll('.reveal');

const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 35);

  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;
    if (window.scrollY >= sectionTop) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', onScroll);
onScroll();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((el) => observer.observe(el));

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('open');
  mobileNav.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
