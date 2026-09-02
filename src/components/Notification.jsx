import { useState, useEffect, useMemo } from 'react';
import './Notification.scss';

function Notification({ admin }) {
    // Разбор admin.message: извлечение таймера и очищенного текста
    const { text, timerSeconds } = useMemo(() => {
        const message = admin?.message || '';
        const regex = /@таймер\s+(\d+)@/i;
        const match = message.match(regex);
        if (match) {
            const seconds = parseInt(match[1], 10);
            const cleanText = message.replace(regex, '').trim();
            return { text: cleanText, timerSeconds: seconds };
        }
        return { text: message, timerSeconds: 0 };
    }, [admin?.message]);

    const [remaining, setRemaining] = useState(timerSeconds);
    const [isTimerActive, setIsTimerActive] = useState(timerSeconds > 0);

    // Сброс таймера при изменении входных данных
    useEffect(() => {
        setRemaining(timerSeconds);
        setIsTimerActive(timerSeconds > 0);
    }, [timerSeconds]);

    // Запуск обратного отсчёта
    useEffect(() => {
        if (!isTimerActive || remaining <= 0) return;

        const interval = setInterval(() => {
            setRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsTimerActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimerActive, remaining]);

    // Если сообщение пустое — ничего не показываем
    if (!admin?.message) return null;

    return (
        <div className ="notification-component">
            <div className="fantasy-notification-overlay">
                <div className="fantasy-notification-content">
                    {text && <div className="fantasy-notification-text">{text}</div>}
                    {timerSeconds > 0 && (
                        <div className="fantasy-timer">
                            <span className="fantasy-timer-digits">{remaining}</span>
                            <span className="fantasy-timer-label">секунд</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notification;