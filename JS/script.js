(function() {
  const animate = () => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const targets = document.querySelectorAll('.menu-section, .menu-item, .site-header, footer');
    targets.forEach((el) => {
      el.classList.add('animate-on-scroll');

      if (el.classList.contains('menu-item')) {
        const parentList = el.closest('.menu-list');
        if (parentList) {
          const siblings = Array.from(parentList.children);
          const index = siblings.indexOf(el);
          const delay = Math.min(index * 0.05, 0.35);
          el.style.setProperty('--delay', `${delay}s`);
        }
      }

      observer.observe(el);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animate);
  } else {
    animate();
  }
})();