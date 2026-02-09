import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './components/slider.js';  // ← добавили!
import './components/mobile-menu.js';
import './utils/animations.js';

// Инициализируем слайдер
const heroSwiper = new Swiper('.hero-swiper', {
  modules: [Pagination, Navigation],
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 800,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
});

// Прокрутка шапки
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.style.height = '60px';
  } else {
    header.style.height = 'auto';
  }
});