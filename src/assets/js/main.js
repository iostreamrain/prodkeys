// Download analytics (optional, privacy-friendly)
document.addEventListener('DOMContentLoaded', () => {
  // Highlight current nav link based on hash
  const updateNavHighlight = () => {
    const sections = ['downloads', 'emulators', 'faq', 'install'];
    const scrollY = window.scrollY;

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const link = document.querySelector(`.nav-links a[href="/#${id}"]`);
      if (!link) return;

      const top = el.offsetTop - 80;
      const bottom = top + el.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        link.setAttribute('aria-current', 'section');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  window.addEventListener('scroll', updateNavHighlight, { passive: true });
  updateNavHighlight();
});
