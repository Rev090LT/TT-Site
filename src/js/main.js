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

// === ОСТАВЬ ТОЛЬКО ОДИН ===
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modal-root').innerHTML = bookingModalHTML;
    initModal();
});

// === УДАЛИ ВТОРОЙ ===

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

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Данные формы:', data);

        try {
            // === ОТПРАВКА НА BACKEND ===
            const response = await fetch('http://localhost:3000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                alert('Заявка успешно отправлена в Telegram!');
            } else {
                console.error('Ошибка бэкенда:', result.error);
                alert('Ошибка: ' + result.error);
            }
        } catch (err) {
            console.error('Ошибка отправки:', err);
            alert('Не удалось отправить заявку');
        }

        form.reset();
        closeModal();
    });
}