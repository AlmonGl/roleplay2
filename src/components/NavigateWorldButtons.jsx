
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase/config.js";
import './NavigateWorldButtons.scss';

function NavigateWorldButtons({ player }) {
  const x = player.x ?? 1;
  const y = player.y ?? 1;

  const move = (dx, dy) => {
    const newX = x + dx;
    const newY = y + dy;

    // Проверка границ: координаты должны быть в пределах [1, 100]
    if (newX < 1 || newX > 100 || newY < 1 || newY > 100) return;

    updateDoc(doc(db, 'players', player.id), {
      x: newX,
      y: newY,
    });
  };

  const canMoveUp = y > 1;
  const canMoveDown = y < 100;
  const canMoveLeft = x > 1;
  const canMoveRight = x < 100;

    return (
      <div className='nav-world-buttons'>
    <div className="navigate-world-buttons">
      <button
        className="nav-btn up"
        onClick={() => move(0, -1)}
        disabled={!canMoveUp}
        aria-label="Вверх"
      >
        ▲
      </button>

      <div className="middle-row">
        <button
          className="nav-btn left"
          onClick={() => move(-1, 0)}
          disabled={!canMoveLeft}
          aria-label="Влево"
        >
          ◀
        </button>
        <button
          className="nav-btn right"
          onClick={() => move(1, 0)}
          disabled={!canMoveRight}
          aria-label="Вправо"
        >
          ▶
        </button>
      </div>

      <button
        className="nav-btn down"
        onClick={() => move(0, 1)}
        disabled={!canMoveDown}
        aria-label="Вниз"
      >
        ▼
      </button>
    </div>
        </div>);
}

export default NavigateWorldButtons;