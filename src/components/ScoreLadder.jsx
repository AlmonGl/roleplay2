import { useEffect, useMemo, useRef, useState } from 'react';
import './ScoreLadder.scss';

// 🔽 ЗАГЛУШКИ — замените на свои пути
import bgImage from '/assets/ladder/bgr1.jpg';
import fireImage from '/assets/ladder/Fire.jpg';
import loseSound from '/assets/ladder/44207.mp3';
import winSound from '/assets/ladder/win.mp3'; // 👈 победный звук

const MAX_SCORE = 10;

const ScoreLadder = ({ players, admin }) => {
    const loseCount = admin?.loseCount ?? 0;

    const visiblePlayers = useMemo(
        () => players.filter(p => p.score > loseCount && p.score <= MAX_SCORE),
        [players, loseCount]
    );

    const fireProgress = Math.min(1, Math.max(0, loseCount / MAX_SCORE));

    // Храним снимок ВСЕХ игроков + значение loseCount на момент снимка
    const prevSnapshotRef = useRef({ loseCount: -1, players: new Map() });
    const [fadingOut, setFadingOut] = useState(new Set());

    const visibleKey = visiblePlayers.map(p => p.id ?? p.name).join('|');

    // Разблокировка аудио по первому пользовательскому жесту
    useEffect(() => {
        const unlock = () => {
            try {
                const a = new Audio();
                a.muted = true;
                a.play().catch(() => { });
            } catch (e) { /* ignore */ }
            window.removeEventListener('click', unlock);
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('keydown', unlock);
        };
        window.addEventListener('click', unlock);
        window.addEventListener('touchstart', unlock);
        window.addEventListener('keydown', unlock);
        return () => {
            window.removeEventListener('click', unlock);
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('keydown', unlock);
        };
    }, []);

    useEffect(() => {
        const prev = prevSnapshotRef.current;
        const currentPlayersMap = new Map(
            players.map(p => [p.id ?? p.name, p])
        );

        // Кто был виден при СТАРОМ loseCount (используем prev.loseCount!)
        const prevVisibleIds = new Set(
            [...prev.players.entries()]
                .filter(([, p]) => p.score > prev.loseCount && p.score <= MAX_SCORE)
                .map(([id]) => id)
        );

        // Кто виден при НОВОМ loseCount
        const currentVisibleIds = new Set(
            visiblePlayers.map(p => p.id ?? p.name)
        );

        const disappeared = [...prevVisibleIds].filter(id => !currentVisibleIds.has(id));

        if (disappeared.length > 0) {
            // Причина: если у игрока текущий score > MAX_SCORE — победа, иначе поражение
            const isWinExit = disappeared.some(id => {
                const current = currentPlayersMap.get(id);
                return current && current.score > MAX_SCORE;
            });

            try {
                const audio = new Audio(isWinExit ? winSound : loseSound);
                audio.volume = 0.6;
                audio.play().catch(err => {
                    // Не глушим ошибку полностью — помогает при отладке
                    console.warn('Audio play failed:', err);
                });
            } catch (e) {
                console.warn('Audio init failed:', e);
            }

            setFadingOut(new Set(disappeared));
            const t = setTimeout(() => setFadingOut(new Set()), 700);

            // Обновляем снимок ПОСЛЕ обработки
            prevSnapshotRef.current = { loseCount, players: currentPlayersMap };
            return () => clearTimeout(t);
        }

        prevSnapshotRef.current = { loseCount, players: currentPlayersMap };
    }, [visibleKey, loseCount, players]);

    const playersCount = Math.max(visiblePlayers.length, 1);
    const iconSize = useMemo(() => {
        const usable = 1000 - 60 - 20;
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