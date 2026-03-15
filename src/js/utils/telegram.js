export async function sendToTelegram(data) {
    const BOT_TOKEN = "8633012404:AAGSlVqBC1bXNv-vJQWETk-IUTldA7v03Nk";
    const CHAT_ID = "1270835574";

    console.log('ENV:', import.meta.env);
    console.log('BOT_TOKEN:', BOT_TOKEN);

    if (!BOT_TOKEN || !CHAT_ID) {
        console.warn('⚠️ Telegram credentials not set. Add VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID to .env');
        return;
    }

    const message = `📌 Новая заявка на ТО

Имя: ${data.clientName || '—'}
Телефон: ${data.phone || '—'}
Модель: ${data.carModel || '—'}
VIN: ${data.vinNumber || '—'}
Услуга: ${data.serviceType || '—'}
Дата: ${data.date || '—'}
Время: ${data.time || '—'}
Комментарий: ${data.comment || '—'}
    `.trim();

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'  // ← или убери эту строку, если не хочешь HTML
            })
        });

        console.log('Fetch response:', response.status, response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Telegram API error:', response.status, errorText);
            return;
        }

        const result = await response.json();
        console.log('✅ Заявка отправлена в Telegram:', result);

    } catch (err) {
        console.error('❌ Ошибка отправки в Telegram:', err.message);
    }
}