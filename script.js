// Отключаем запоминание позиции скролла браузером и всегда открываем с самого верха
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Если в адресной строке остался хэш (#contact или др.), очищаем его и скроллим вверх
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
});

// Управление загрузчиком страницы
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      window.scrollTo(0, 0);
    }, 400);
  }
});

// Прогресс-бар скролла и кнопка "Наверх"
const scrollProgress = document.getElementById('scrollProgress');
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + '%';
  }

  if (scrollToTopBtn) {
    if (winScroll > 350) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }
});

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Переключатель темы (Dark / Light)
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('keldibek_portfolio_theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('keldibek_portfolio_theme', newTheme);
  });
}

// Переключатель языка (RU / EN)
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('keldibek_portfolio_lang') || 'ru';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('keldibek_portfolio_lang', lang);

  document.querySelectorAll('[data-ru][data-en]').forEach(el => {
    el.innerText = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ru');
  });

  const ruOpt = document.querySelector('.lang-option[data-lang="ru"]');
  const enOpt = document.querySelector('.lang-option[data-lang="en"]');
  if (ruOpt && enOpt) {
    if (lang === 'en') {
      ruOpt.classList.remove('active');
      enOpt.classList.add('active');
    } else {
      ruOpt.classList.add('active');
      enOpt.classList.remove('active');
    }
  }
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const nextLang = currentLang === 'ru' ? 'en' : 'ru';
    applyLanguage(nextLang);
  });
}

// Применяем сохраненный язык при старте
applyLanguage(currentLang);

// Мобильное меню
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
    });
  });
}

// Фильтрация проектов
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  });
});

// Форма обратной связи
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const msg = document.getElementById('senderMsg').value;

    if (formFeedback) {
      formFeedback.classList.remove('hidden');
      contactForm.reset();
      setTimeout(() => {
        formFeedback.classList.add('hidden');
      }, 5000);
    }
  });
}

// Анимация плавного появления элементов при скролле (Scroll Reveal)
const revealElements = document.querySelectorAll('.about-card, .skill-category-card, .project-card, .discipline-card, .contact-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
