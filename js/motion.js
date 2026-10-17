(() => {
  const heroBgs = document.querySelectorAll(".hero-bg");
  const heroCopy = document.querySelector(".hero-copy");
  const layers = [
    { el: document.querySelector(".group-themes"), depth: 110 },
    { el: document.querySelector(".group-screens"), depth: 82 },
    { el: document.querySelector(".group-styles"), depth: 120 },
    { el: document.querySelector(".group-favorites"), depth: 90 },
  ].filter((layer) => layer.el);
  const compact = window.matchMedia("(max-width: 1100px)");

  let ticking = false;

  function yOffset() {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  }

  function update() {
    ticking = false;

    const y = yOffset();
    const vh = window.innerHeight || 1;
    const hero = document.querySelector(".hero");
    const heroH = hero ? hero.offsetHeight : vh;

    if (compact.matches) {
      const t = Math.min(y / Math.max(heroH, 1), 1);
      heroBgs.forEach((img) => {
        img.style.transform = `translate3d(0, ${-t * 24}px, 0) scale(${1.06 + t * 0.05})`;
      });
      if (heroCopy) {
        heroCopy.style.transform = `translate3d(0, ${-t * 10}px, 0)`;
      }
    } else {
      const heroShift = Math.min(y, heroH) * 0.38;
      heroBgs.forEach((img) => {
        img.style.transform = `translate3d(0, ${heroShift}px, 0) scale(1.12)`;
      });
      if (heroCopy) {
        heroCopy.style.transform = `translate3d(0, ${heroShift * 0.45}px, 0)`;
      }
    }

    layers.forEach(({ el, depth }) => {
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const progress = (mid - vh * 0.55) / vh;
      const shift = Math.max(-1.2, Math.min(1.2, progress)) * depth;
      el.style.transform = `translate3d(0, ${shift}px, 0)`;
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  compact.addEventListener("change", onScroll);
  update();
})();
