import { useEffect, useMemo, useRef, useState } from 'react';
import './ScoreLadder.scss';

// 🔽 ЗАГЛУШКИ — замените на свои пути
import bgImage from '/assets/ladder/bgr1.jpg';
import fireImage from '/assets/ladder/Fire.jpg';
import loseSound from '/assets/ladder/44207.mp3';

const MAX_SCORE = 10; // шкала 0..10

const ScoreLadder = ({ players, admin }) => {
    const loseCount = admin?.loseCount ?? 0;

    // Видимые игроки — в исходном порядке массива (без сортировки)
    const visiblePlayers = useMemo(
        () => players.filter(p => p.score > loseCount),
        [players, loseCount]
    );

    // Позиция огня по шкале 0..10 → 0..1
    const fireProgress = Math.min(1, Math.max(0, loseCount / MAX_SCORE));

    // Отслеживаем исчезающих
    const prevVisibleIdsRef = useRef(new Set());
    const [fadingOut, setFadingOut] = useState(new Set());

    const visibleKey = visiblePlayers.map(p => p.id ?? p.name).join('|');

    useEffect(() => {
        const prevIds = prevVisibleIdsRef.current;
        const currentIds = new Set(visiblePlayers.map(p => p.id ?? p.name));
        const disappeared = [...prevIds].filter(id => !currentIds.has(id));

        if (disappeared.length > 0) {
            try {
                const audio = new Audio(loseSound);
                audio.volume = 0.6;
                audio.play().catch(() => { });
            } catch (e) { /* ignore */ }

            setFadingOut(new Set(disappeared));
            const t = setTimeout(() => setFadingOut(new Set()), 700);
            prevVisibleIdsRef.current = currentIds;
            return () => clearTimeout(t);
        }

        prevVisibleIdsRef.current = currentIds;
    }, [visibleKey]);

    // Размер иконки зависит от количества видимых игроков
    const playersCount = Math.max(visiblePlayers.length, 1);
    const iconSize = useMemo(() => {
        const usable = 1000 - 60 - 20; // высота минус шкала и нижний отступ
        const raw = Math.floor(usable / playersCount) - 12;
        return Math.max(40, Math.min(200, raw));
    }, [playersCount]);

    return (
        <div
            className="score-ladder"
            style={{
                backgroundImage: `url(${bgImage})`,
                '--icon-size': `${iconSize}px`
            }}
        >
            <div className="score-ladder__overlay" />

            {/* 🔥 Огонь: растёт слева направо */}
            <div
                className="score-ladder__fire"
                style={{
                    '--fire-progress': fireProgress,
                    backgroundImage: `url(${fireImage})`
                }}
            >
                <div className="score-ladder__fire-edge" />
                <div className="score-ladder__fire-glow" />
            </div>

            {/* Шкала очков сверху */}
            <div className="score-ladder__scale">
                {Array.from({ length: MAX_SCORE + 1 }).map((_, i) => (
                    <div
                        key={i}
                        className="score-ladder__scale-tick"
                        style={{ left: `${(i / MAX_SCORE) * 100}%` }}
                    >
                        <span className="score-ladder__scale-num">{i}</span>
                    </div>
                ))}
            </div>

            {/* Дорожка с иконками */}
            <div className="score-ladder__track">
                {visiblePlayers.map((player, index) => {
                    const id = player.id ?? player.name;
                    const isFading = fadingOut.has(id);
                    const left = Math.min(1, Math.max(0, player.score / MAX_SCORE));

                    return (
                        <div
                            key={id}
                            className={`score-ladder__player ${isFading ? 'score-ladder__player--fading' : ''}`}
                            style={{
                                '--player-color': player.color || '#7fd3ff',
                                '--player-left': left,
                                '--player-row': index
                            }}
                        >
                            <div className="score-ladder__icon-wrap">
                                {player.icon}
                                <div className="score-ladder__glow" />
                            </div>
                        </div>
                    );
                })}

                {visiblePlayers.length === 0 && (
                    <div className="score-ladder__empty">Нет активных игроков</div>
                )}
            </div>

            
        </div>
    );
};

export default ScoreLadder;