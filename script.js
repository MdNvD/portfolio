// ============================================
// PORTFOLIO — Mohamed Navith S
// Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Cursor Glow ----
  const cursorGlow = document.getElementById('cursor-glow');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (cursorGlow) {
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
    }
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Hide/show nav on scroll
    if (scrollY > lastScrollY && scrollY > 300) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    navbar.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease';
    lastScrollY = scrollY;
  });

  // ---- Mobile Menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // ---- Scroll Reveal ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay based on index within parent
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.07}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Typed Text Effect ----
  const typedEl = document.getElementById('typed-text');
  const phrases = [
    'Full Stack Developer',
    'AI/ML Engineer',
    'Open Source Builder',
    'Python & React Expert',
    'FastAPI Specialist'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    if (!typedEl) return;
    const current = phrases[phraseIdx];

    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIdx === current.length) {
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  setTimeout(typeEffect, 1000);

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1500;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current = Math.min(Math.round(increment * step), target);
          el.textContent = current;
          if (step >= steps) clearInterval(timer);
        }, duration / steps);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ---- Card Tilt Effect ----
  const cards = document.querySelectorAll('.project-card, .bento-card, .achievement-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Skill pills interactive glow ----
  const skillPills = document.querySelectorAll('.skill-pill');
  skillPills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.25)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.boxShadow = '';
    });
  });

  // ---- Particle burst on button click ----
  function createParticleBurst(x, y, color = '#7c3aed') {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${color};
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(particle);

      const angle = (i / 8) * Math.PI * 2;
      const distance = 40 + Math.random() * 30;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      particle.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 }
      ], { duration: 500, easing: 'ease-out' }).onfinish = () => particle.remove();
    }
  }

  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      createParticleBurst(e.clientX, e.clientY);
    });
  });

  // ---- Nav logo animation ----
  const navLogo = document.getElementById('nav-logo-link');
  if (navLogo) {
    navLogo.addEventListener('mouseenter', () => {
      navLogo.style.transform = 'scale(1.05)';
      navLogo.style.transition = 'transform 0.2s ease';
    });
    navLogo.addEventListener('mouseleave', () => {
      navLogo.style.transform = '';
    });
  }

  // ---- Staggered project cards reveal ----
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.15}s`;
  });

  // ---- Dynamic section separators with glow lines ----
  const sections2 = document.querySelectorAll('.section');
  sections2.forEach(section => {
    const glowLine = document.createElement('div');
    glowLine.style.cssText = `
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.4), transparent);
      pointer-events: none;
    `;
    section.style.position = 'relative';
    section.appendChild(glowLine);
  });

  console.log('%c👋 Hey there developer! Built with ❤️ by Mohamed Navith S', 
    'color: #7c3aed; font-size: 14px; font-weight: bold; padding: 8px;');
});
