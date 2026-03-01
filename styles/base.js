/* ============================================================
   LAWIA — Shared JS (Animations + Variant Navigation)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Scroll-triggered animations ---- */
  const animEls = document.querySelectorAll(
    '.anim-fade-in, .anim-slide-up, .anim-slide-down, .anim-slide-left, .anim-slide-right, .anim-scale-in, .anim-blur-in'
  );

  if (animEls.length) {
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    animEls.forEach(el => animObserver.observe(el));
  }

  /* ---- Variant nav active state ---- */
  const sections = document.querySelectorAll('.variant-section');
  const navLinks = document.querySelectorAll('.variant-nav a:not(.nav-title)');

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: '-56px 0px -40% 0px'
    });

    sections.forEach(s => navObserver.observe(s));
  }

  /* ---- Counter animation (for stat numbers) ---- */
  document.querySelectorAll('[data-count-to]').forEach(el => {
    const target = parseInt(el.dataset.countTo, 10);
    const suffix = el.dataset.countSuffix || '';
    const prefix = el.dataset.countPrefix || '';
    const duration = parseInt(el.dataset.countDuration, 10) || 2000;
    let started = false;

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          animateCount(el, target, prefix, suffix, duration);
        }
      });
    }, { threshold: 0.5 });

    countObserver.observe(el);
  });

  function animateCount(el, target, prefix, suffix, duration) {
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = prefix + current.toLocaleString('fr-FR') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---- Typing animation ---- */
  document.querySelectorAll('[data-typing]').forEach(el => {
    const text = el.dataset.typing;
    const speed = parseInt(el.dataset.typingSpeed, 10) || 40;
    const delay = parseInt(el.dataset.typingDelay, 10) || 0;
    el.textContent = '';
    let started = false;

    const typingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          setTimeout(() => typeText(el, text, speed), delay);
        }
      });
    }, { threshold: 0.5 });

    typingObserver.observe(el);
  });

  function typeText(el, text, speed) {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  /* ---- Parallax subtle (data-parallax) ---- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    }, { passive: true });
  }

});
