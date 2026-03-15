// server/index.js
import express from 'express';
import cors from 'cors';
import { createTransport } from 'nodemailer';

const app = express();
const PORT = 3000;

// === НАСТРОЙКИ EMAIL ===
const EMAIL_CONFIG = {
    address: 't.simon2005@gmail.com', // ← только здесь
    password: 'jzqx ewwf jeud brfq'   // ← только здесь
};
// === КОНЕЦ НАСТРОЕК ===

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Настройка Nodemailer (Gmail)
const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_CONFIG.address, // ← используем из настроек
        pass: EMAIL_CONFIG.password // ← используем из настроек
    }
});

// API endpoint для заявок
app.post('/api/bookings', async (req, res) => {
    const { clientName, phone, carModel, vinNumber, serviceType, date, time, comment } = req.body;

    if (!clientName || !phone) {
        return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }

    const mailOptions = {
        from: EMAIL_CONFIG.address, // ← используем из настроек
        to: EMAIL_CONFIG.address,   // ← используем из настроек (можно изменить на другой)
        subject: 'Новая заявка на ТО — TrackTime Performance',
        html: `
            <h2>📌 Новая заявка на техобслуживание</h2>
            <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                <tr><td><strong>Имя:</strong></td><td>${clientName}</td></tr>
                <tr><td><strong>Телефон:</strong></td><td>${phone}</td></tr>
                <tr><td><strong>Модель:</strong></td><td>${carModel || '—'}</td></tr>
                <tr><td><strong>VIN:</strong></td><td>${vinNumber || '—'}</td></tr>
                <tr><td><strong>Услуга:</strong></td><td>${serviceType || '—'}</td></tr>
                <tr><td><strong>Дата:</strong></td><td>${date || '—'}</td></tr>
                <tr><td><strong>Время:</strong></td><td>${time || '—'}</td></tr>
                <tr><td><strong>Комментарий:</strong></td><td>${comment || '—'}</td></tr>
            </table>
            <p><em>Отправлено с сайта TrackTime Performance</em></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email отправлен:', clientName, phone);

        res.status(200).json({ success: true, message: 'Заявка отправлена на email' });

    } catch (err) {
        console.error('❌ Ошибка отправки email:', err.message);
        res.status(500).json({ error: 'Ошибка отправки email: ' + err.message });
    }
});

app.get('/', () => {
    res.send('Backend OK');
});

app.listen(PORT, () => {
    console.log(`🚀 Backend запущен на http://localhost:${PORT}`);
});