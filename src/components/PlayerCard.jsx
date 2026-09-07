
import './PlayerCard.css';

const PlayerCard = ({ player }) => {
    // Проверка на наличие player
    if (!player) {
        return <div className="player2-card-empty">Нет данных об игроке</div>;
    }

    const {
        name = 'Неизвестный игрок',
        icon = '🎮',
        HP = 0,
        score = 0,
        items = [],
        description = ''
    } = player;

    return (
        <>
            
            <div className="player2-card">
                <div className="player2-header">
                    <div className="player2-icon">
                        {typeof icon === 'string' && icon.includes('http') ? (
                            <img src={icon} alt={`Иконка ${name}`} />
                        ) : (
                            <span className="player2-emoji-icon">{icon}</span>
                        )}
                    </div>

                    <div className="player2-info">
                        <h2 className="player2-name">{name}</h2>
                        <p className="player2-description">{description}</p>
                    </div>
                </div>

                <div className="player2-stats">
                    <div className="player2-stat-item">
                        <span className="player2-stat-icon">❤️</span>
                        <div className="player2-stat-content">
                            <span className="player2-stat-label">Жизни</span>
                            <div className="player2-health-bar">
                                <div
                                    className="player2-health-fill"
                                    style={{ width: `${Math.min(100, Math.max(0, HP)*5)}%` }}
                                ></div>
                            </div>
                            <span className="player2-stat-value">{HP} HP</span>
                        </div>
                    </div>

                    <div className="player2-stat-item">
                        <span className="player2-stat-icon">⭐</span>
                        <div className="player2-stat-content">
                            <span className="player2-stat-label">Рейтинг</span>
                            <span className="player2-stat-value player2-score">{score}</span>
                        </div>
                    </div>
                </div>

                {items && items.length > 0 && (
                    <div className="player2-items">
                        <h3 className="player2-items-title">Предметы</h3>
                        <div className="player2-items-list">
                            {items.map((item, index) => (
                                <div key={index} className="player2-item-badge" title={item.icon}>
                                    
                                    <span className="player2-item-name">{item.name}</span>
                                   
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            
        </>
    );
};

export default PlayerCard;