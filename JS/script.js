(function () {
  const SELECTOR = '.menu-section, .menu-item, .site-header, footer';
  let initialized = false;

  function initScrollAnimations() {
    if (initialized) return; // evita rodar duas vezes
    initialized = true;

    const targets = document.querySelectorAll(SELECTOR);
    if (!targets.length) return;

    const supportsMatchMedia = typeof window.matchMedia === 'function';
    const prefersReducedMotion = supportsMatchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Classe base de animação pra todo mundo
    targets.forEach((el) => {
      el.classList.add('animate-on-scroll');
    });

    // Calcula delay suave pros itens do menu, em ordem
    const lists = document.querySelectorAll('.menu-list');
    lists.forEach((list) => {
      const items = list.querySelectorAll('.menu-item');
      items.forEach((item, index) => {
        const delay = Math.min(index * 0.05, 0.35); // até 0.35s de delay
        item.style.setProperty('--delay', `${delay}s`);
      });
    });

    // Fallback: sem animação de scroll, todo mundo já entra visível
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // animou uma vez, nunca mais observa
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -5% 0px', // começa um pouco antes de chegar total na viewport
      }
    );

    targets.forEach((el) => observer.observe(el));

    // Só por higiene: desconecta se a página for embora
    window.addEventListener('beforeunload', () => observer.disconnect());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations, { once: true });
  } else {
    initScrollAnimations();
  }
})();
