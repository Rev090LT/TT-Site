// src/js/main.js

import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './components/mobile-menu.js';
import './utils/animations.js';
import bookingModalHTML from '../html/booking-modal.html?raw';

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

// src/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modal-root').innerHTML = bookingModalHTML;
    initModal();
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(new URL('../html/booking-modal.html', import.meta.url));
        const html = await response.text();
        document.getElementById('modal-root').innerHTML = html;
        initModal();
    } catch (err) {
        console.error('Ошибка загрузки модального окна:', err);
    }
});

function initModal() {
    const openBtn1 = document.getElementById('openBookingModal');      // из шапки
    const openBtn2 = document.getElementById('openBookingModalHero');  // из Hero
    const closeBtn = document.getElementById('closeModal');
    const modal = document.getElementById('bookingModal');
    const form = document.getElementById('bookingForm');

    // === ПРОВЕРКА: если модального окна нет — выходим ===
    if (!modal) {
        console.error('❌ Модальное окно не найдено в DOM!');
        return;
    }

    const openModal = (e) => {
        e.preventDefault();

        // === ЕЩЁ РАЗ ПРОВЕРИМ, НА ВСЯКИЙ СЛУЧАЙ ===
        if (!modal) {
            console.error('❌ Модальное окно не найдено!');
            return;
        }

        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    };

    openBtn1?.addEventListener('click', openModal);
    openBtn2?.addEventListener('click', openModal);

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal) modal.style.display = 'none';
            }, 300);
        }
    };

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Данные формы:', data);
        alert('Заявка успешно отправлена!');
        form.reset();
        closeModal();
    });
}