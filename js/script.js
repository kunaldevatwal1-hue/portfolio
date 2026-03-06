/* ══════════════════════════════════════════
   COZYDIADORA – script.js
   Handles scroll animations, contact form, and smooth interactions
══════════════════════════════════════════ */

// ── Scroll-triggered fade-in animations ──
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in-up');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  elements.forEach(el => observer.observe(el));
};

// ── Smooth scroll for nav / CTA buttons ──
const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

// ── Contact form – basic validation & feedback ──
const setupContactForm = () => {
  const btn = document.querySelector('.btn-submit');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name  = document.querySelector('.form-input[placeholder="Name"]');
    const email = document.querySelector('.form-input[placeholder="Email"]');
    const desc  = document.querySelector('.form-textarea');

    // Simple validation
    if (!name.value.trim() || !email.value.trim() || !desc.value.trim()) {
      shakeBtn(btn);
      return;
    }
    if (!isValidEmail(email.value)) {
      email.style.boxShadow = '0 0 0 2px #f87171';
      setTimeout(() => email.style.boxShadow = '', 2000);
      return;
    }

    // Success feedback
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#22C55E';
    btn.disabled = true;

    // Reset after 3s
    setTimeout(() => {
      btn.textContent = 'Submit';
      btn.style.background = '';
      btn.disabled = false;
      name.value = '';
      email.value = '';
      desc.value = '';
    }, 3000);
  });

  // Clear error highlight on focus
  document.querySelectorAll('.form-input, .form-textarea').forEach(el => {
    el.addEventListener('focus', () => el.style.boxShadow = '');
  });
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const shakeBtn = (el) => {
  el.style.transform = 'translateX(-6px)';
  setTimeout(() => el.style.transform = 'translateX(6px)', 80);
  setTimeout(() => el.style.transform = 'translateX(-4px)', 160);
  setTimeout(() => el.style.transform = 'translateX(0)', 240);
};

// ── "Book a call" / "Connect" buttons → scroll to contact ──
const setupBookCallBtns = () => {
  document.querySelectorAll('.btn-dark').forEach(btn => {
    const text = btn.textContent.trim().toLowerCase();
    if (text.includes('book') || text.includes('connect') || text.includes('call')) {
      btn.addEventListener('click', () => {
        const contact = document.querySelector('#contact');
        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
};

// ── "Contact Us" button ──
const setupContactUsBtn = () => {
  const btn = document.querySelector('.btn-gray');
  if (btn) {
    btn.addEventListener('click', () => {
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
  }
};

// ── Portfolio card hover tilt effect ──
const setupTiltEffect = () => {
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

// ── Animate hero elements on load ──
const animateHeroOnLoad = () => {
  const items = [
    '.available-badge',
    '.hero-heading',
    '.hero-sub',
    '.btn-gray',
  ];
  items.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .6s ease ${i * 0.12}s, transform .6s ease ${i * 0.12}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 80);
  });
};

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  animateHeroOnLoad();
  animateOnScroll();
  setupSmoothScroll();
  setupContactForm();
  setupBookCallBtns();
  setupContactUsBtn();
  setupTiltEffect();
});