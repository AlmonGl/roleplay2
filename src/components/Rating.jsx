// FantasyScoreTable.jsx
import  { useState, useEffect, useRef } from 'react';
import './Rating.css';

const Rating = ({ players }) => {
    
    const [animatingIds, setAnimatingIds] = useState(new Set());
    const previousScoresRef = useRef({});
    const currentScoresRef = useRef({});
    // Анимация при изменении очков
    useEffect(() => {
        
        const animatedIds = new Set();

        players.forEach(player => {

            const previousScore = previousScoresRef.current[player.id] || 0;
            const currentScore = player.score;
            currentScoresRef.current[player.id] = player.score;
            
            

            // Проверяем изменение очков
            if (currentScore !== previousScore) {
                animatedIds.add(player.id);
                console.log(player.id);
            }
            
        });

        

        // Запускаем анимацию
        if (animatedIds.size > 0) {
            setAnimatingIds(animatedIds);

            // Очищаем анимацию через 1 секунду
            const timeout = setTimeout(() => {
                setAnimatingIds(new Set());
            }, 1000);

            return () => clearTimeout(timeout);
        }

        
    }, [players]);

    // Сортировка игроков по очкам
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    // Получение класса для анимации
    const getAnimationClass = (playerId) => {
        if (animatingIds.has(playerId)) {
            const player = players.find(p => p.id === playerId);
            const previousScore = previousScoresRef.current[playerId] || 0;
            const currentScore = player?.score || 0;

            if (currentScore > previousScore) {
                previousScoresRef.current[player.id] = currentScoresRef.current[player.id];
                return 'score-increase';
            } else if (currentScore < previousScore) {
                previousScoresRef.current[player.id] = currentScoresRef.current[player.id];
                return 'score-decrease';
            }
        }
        return '';
    };

    // Получение ранга игрока
    const getRank = (index) => {
        const ranks = ['👑', '🥈', '🥉'];
        return ranks[index] || `${index + 1} место`;
    };

    return (
        <div className="fantasy-table-container">
            <div className="fantasy-table-header">
                <h2 className="fantasy-title">🏆 Статистика 🏆</h2>
                <div className="magical-divider"></div>
            </div>

            <div className="fantasy-table">
                <div className="table-header">
                    <div className="header-rank">Ранг</div>
                    <div className="header-player">Игрок</div>
                    <div className="header-class">Жизни</div>
                    <div className="header-score">Очки</div>
                </div>

                {sortedPlayers.map((player, index) => (
                    <div
                        key={player.id}
                        className={`table-row ${index < 3 ? 'top-player' : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="row-rank">
                            <span className="rank-badge">{getRank(index)}</span>
                        </div>

                        <div className="row-player">
                            <span className="player-avatar">{player.icon || '🧙'}</span>
                            <span className="player-name">{player.name}</span>
                        </div>

                        <div className="row-class">
                            
                            <span className="hp-value">{player.HP}</span>
                        </div>

                        <div className={`row-score ${getAnimationClass(player.id)}`}>
                            <span className="score-value">{player.score}</span>
                           
                        </div>
                    </div>
                ))}
            </div>

            
        </div>
    );
};

export default Rating