
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase/config.js";
import './NavigateWorldButtons.scss';

function NavigateWorldButtons({ player }) {
    const x = player.x ?? 1;
    const y = player.y ?? 1;

    const move = (dx, dy) => {
        const newX = x + dx;
        const newY = y + dy;

        // Проверка границ 1..100
        if (newX < 1 || newX > 100 || newY < 1 || newY > 100) return;

        updateDoc(doc(db, 'players', player.id), {
            x: newX,
            y: newY,
        });
    };

    // Зоны-обработчики
    const handleMove = (zone) => {
        switch (zone) {
            case 'up':
                move(0, -1);
                break;
            case 'down':
                move(0, 1);
                break;
            case 'left':
                move(-1, 0);
                break;
            case 'right':
                move(1, 0);
                break;
            default:
                break;
        }
    };

    return (
        <div className = 'nav-world-buttons'>
        <div className="touch-panel">
            <div
                className="touch-zone zone-up"
                onClick={() => handleMove('up')}
                onTouchStart={(e) => {
                    e.preventDefault();
                    handleMove('up');
                }}
                role="button"
                aria-label="Вверх"
            >
                <span className="zone-icon">▲</span>
            </div>

            <div className="touch-row-middle">
                <div
                    className="touch-zone zone-left"
                    onClick={() => handleMove('left')}
                    onTouchStart={(e) => {
                        e.preventDefault();
                        handleMove('left');
                    }}
                    role="button"
                    aria-label="Влево"
                >
                    <span className="zone-icon">◀</span>
                </div>

                <div
                    className="touch-zone zone-right"
                    onClick={() => handleMove('right')}
                    onTouchStart={(e) => {
                        e.preventDefault();
                        handleMove('right');
                    }}
                    role="button"
                    aria-label="Вправо"
                >
                    <span className="zone-icon">▶</span>
                </div>
            </div>

            <div
                className="touch-zone zone-down"
                onClick={() => handleMove('down')}
                onTouchStart={(e) => {
                    e.preventDefault();
                    handleMove('down');
                }}
                role="button"
                aria-label="Вниз"
            >
                <span className="zone-icon">▼</span>
            </div>
        </div>
        </div>
    );
}

export default NavigateWorldButtons;