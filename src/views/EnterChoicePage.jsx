import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase/config.js";

export default function EnterChoicePage({ player }) {
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!answer.trim()) return; // не отправляем пустой ответ

        setLoading(true);
        try {
            const playerRef = doc(db, 'players', player.id);
            await updateDoc(playerRef, {
                lastEnterAnswer: answer.trim(), status: "idle"
            });
            setAnswer(''); // очистка поля после успешной отправки
            // Здесь можно добавить уведомление об успехе
        } catch (error) {
            console.error('Ошибка при сохранении ответа:', error);
            // Показать пользователю сообщение об ошибке
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Введите ваш ответ"
                    style={styles.input}
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={loading || !answer.trim()}
                    style={styles.button}
                >
                    {loading ? 'Отправка...' : 'Отправить'}
                </button>
            </form>
        </div>
    );
}

// Минималистичные стили, адаптированные под мобильные устройства
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'up',
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        padding: '16px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '400px',
    },
    input: {
        padding: '14px 16px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    button: {
        padding: '14px',
        fontSize: '16px',
        fontWeight: '500',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        opacity: 1,
        transition: 'opacity 0.2s',
    },
};

