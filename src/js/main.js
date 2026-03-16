// src/js/main.js
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './components/mobile-menu.js';
import './utils/animations.js';
import bookingModalHTML from '../html/booking-modal.html?raw';

// === Регистрируем модули ===
Swiper.use([Autoplay, Pagination, Navigation]);

// === ОСТАВЬ ТОЛЬКО ОДИН DOMContentLoaded ===
document.addEventListener('DOMContentLoaded', () => {
    // === ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА ВНУТРИ ===
    const heroSwiper = new Swiper('.hero-swiper', {
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
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
    });

    // === ВСТАВКА МОДАЛКИ ===
    document.getElementById('modal-root').innerHTML = bookingModalHTML;
    initModal();
});

function initModal() {
    const openBtn1 = document.getElementById('openBookingModal');
    const openBtn2 = document.getElementById('openBookingModalHero');
    const closeBtn = document.getElementById('closeModal');
    const modal = document.getElementById('bookingModal');
    const form = document.getElementById('bookingForm');

    if (!modal) {
        console.error('❌ Модальное окно не найдено в DOM!');
        return;
    }

    const openModal = (e) => {
        e.preventDefault();
        if (!modal) return;
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