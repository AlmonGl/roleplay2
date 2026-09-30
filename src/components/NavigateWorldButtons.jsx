import { useRef, useCallback, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from "../firebase/config.js";
import './NavigateWorldButtons.scss';

function NavigateWorldButtons({ player }) {
    // Храним актуальные координаты в ref, чтобы интервал не "застревал"
    // на старом значении из замыкания
    const coordsRef = useRef({
        x: player.x ?? 1,
        y: player.y ?? 1,
    });

    // Синхронизируем ref при обновлении пропса player
    useEffect(() => {
        coordsRef.current = {
            x: player.x ?? 1,
            y: player.y ?? 1,
        };
    }, [player.x, player.y]);

    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);
    const isHoldingRef = useRef(false);

    // Один шаг в заданном направлении
    const move = useCallback(async (dx, dy) => {
        const { x, y } = coordsRef.current;
        const newX = x + dx;
        const newY = y + dy;

        // Проверка границ 1..100
        if (newX < 1 || newX > 100 || newY < 1 || newY > 100) return;

        // Оптимистично обновляем локальные координаты,
        // чтобы следующий шаг считался от новой позиции
        coordsRef.current = { x: newX, y: newY };

        try {
            await updateDoc(doc(db, 'players', player.id), {
                x: newX,
                y: newY,
            });
        } catch (err) {
            console.error('Ошибка обновления позиции:', err);
            // Откат при ошибке
            coordsRef.current = { x, y };
        }
    }, [player.id]);

    // Преобразование зоны в вектор
    const zoneToDelta = (zone) => {
        switch (zone) {
            case 'up': return [0, -1];
            case 'down': return [0, 1];
            case 'left': return [-1, 0];
            case 'right': return [1, 0];
            default: return [0, 0];
        }
    };

    // Старт удержания
    const startMove = useCallback((zone) => {
        if (isHoldingRef.current) return;
        isHoldingRef.current = true;

        const [dx, dy] = zoneToDelta(zone);

        // Первый шаг — сразу
        move(dx, dy);

        // Пауза перед автоповтором (как у клавиатуры)
        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                move(dx, dy);
            }, 150); // скорость автоповтора, мс
        }, 250);
    }, [move]);

    // Стоп удержания
    const stopMove = useCallback(() => {
        isHoldingRef.current = false;
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
        timeoutRef.current = null;
        intervalRef.current = null;
    }, []);

    // Чистим таймеры при размонтировании
    useEffect(() => stopMove, [stopMove]);

    // Универсальные пропсы для зоны
    const zoneProps = (zone, label) => ({
        role: 'button',
        'aria-label': label,
        onMouseDown: () => startMove(zone),
        onMouseUp: stopMove,
        onMouseLeave: stopMove,
        onTouchStart: (e) => {
            e.preventDefault();
            startMove(zone);
        },
        onTouchEnd: stopMove,
        onTouchCancel: stopMove,
    });

    return (
        <div className='nav-world-buttons'>
            <div className="touch-panel">
                <div className="touch-zone zone-up" {...zoneProps('up', 'Вверх')}>
                    <span className="zone-icon">▲</span>
                </div>

                <div className="touch-row-middle">
                    <div className="touch-zone zone-left" {...zoneProps('left', 'Влево')}>
                        <span className="zone-icon">◀</span>
                    </div>

                    <div className="touch-zone zone-right" {...zoneProps('right', 'Вправо')}>
                        <span className="zone-icon">▶</span>
                    </div>
                </div>

                <div className="touch-zone zone-down" {...zoneProps('down', 'Вниз')}>
                    <span className="zone-icon">▼</span>
                </div>
            </div>
        </div>
    );
}

export default NavigateWorldButtons;