// ==========================================
// 1. Управление скроллом: гарантированный старт с верха страницы
// ==========================================
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Если в URL остался хэш (#contact или др.), очищаем его без перезагрузки
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

// Принудительный скролл наверх на всех этапах загрузки
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
    }, 350);
  }
});

// ==========================================
// 2. Прогресс-бар скролла и кнопка "Наверх"
// ==========================================
const scrollProgress = document.getElementById('scrollProgress');
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  
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

// ==========================================
// 3. Переключатель темы (Dark / Light)
// ==========================================
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

// ==========================================
// 4. Трёхъязычная система (RU / KG / EN)
// ==========================================
const pageTitles = {
  ru: 'Келдибек Канатбеков | Портфолио Frontend-разработчика',
  kg: 'Келдибек Канатбеков | Frontend-иштеп чыгуучунун портфолиосу',
  en: 'Keldibek Kanatbekov | Frontend Developer Portfolio'
};

let currentLang = localStorage.getItem('keldibek_portfolio_lang') || 'ru';
if (!['ru', 'kg', 'en'].includes(currentLang)) {
  currentLang = 'ru';
}

function applyLanguage(lang) {
  if (!['ru', 'kg', 'en'].includes(lang)) {
    lang = 'ru';
  }
  currentLang = lang;
  localStorage.setItem('keldibek_portfolio_lang', lang);
  document.documentElement.lang = lang;

  if (pageTitles[lang]) {
    document.title = pageTitles[lang];
  }

  // Обновление текстовых элементов сайта
  document.querySelectorAll('[data-ru], [data-kg], [data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`) || el.getAttribute('data-ru');
    if (text) {
      el.textContent = text;
    }
  });

  // Обновление плейсхолдеров формы
  document.querySelectorAll('[data-ru-ph], [data-kg-ph], [data-en-ph]').forEach(el => {
    const ph = el.getAttribute(`data-${lang}-ph`) || el.getAttribute('data-ru-ph');
    if (ph) {
      el.placeholder = ph;
    }
  });

  // Обновление активной кнопки переключения языка
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Привязка обработчиков клика к кнопкам переключения языков
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    if (lang) {
      applyLanguage(lang);
    }
  });
});

// Инициализация языка при открытии
applyLanguage(currentLang);

// ==========================================
// 5. Мобильное меню бургер
// ==========================================
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

// ==========================================
// 6. Фильтрация проектов
// ==========================================
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

// ==========================================
// 7. Форма обратной связи
// ==========================================
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formFeedback) {
      formFeedback.classList.remove('hidden');
      contactForm.reset();
      setTimeout(() => {
        formFeedback.classList.add('hidden');
      }, 5000);
    }
  });
}

// ==========================================
// 8. Анимация появления элементов при скролле (Scroll Reveal)
// ==========================================
const revealElements = document.querySelectorAll(
  '.about-card, .skill-category-card, .project-card, .discipline-card, .contact-card, .phone-hub-card'
);

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
  el.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  observer.observe(el);
});
