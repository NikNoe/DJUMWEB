(function () {
  const star = document.getElementById('hero-star');
  const hero = document.getElementById('accueil');
  if (!star || !hero) return;

  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (window.scrollY < hero.offsetHeight) {
          star.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
