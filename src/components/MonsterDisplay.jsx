
import './MonsterDisplay.css';

const MonsterDisplay = ({ id, level }) => {




    const monster = {
        name: 'Древний Лесной Дух',
        health: 150,
        maxHealth: 150,
        attacks: [
            { name: 'Николай I', damage: 55, type: 'monolog' },
            { name: 'Николай I', damage: 30, type: 'solo' },
            { name: 'Александр I', damage: 30, type: 'difficult' },
            { name: 'Александр I', damage: 20, type: 'normal' }
        ],
        image: `/assets/monsters/${id}.png`
    };

    const healthPercentage = (monster.health / monster.maxHealth) * 100;

    const getHealthColor = () => {
        if (healthPercentage > 60) return '#4CAF50';
        if (healthPercentage > 30) return '#FF9800';
        return '#f44336';
    };

    function handleMonsterClick() {
        
    }
    
    return (

        <div className="monster-container">

            
            <div className="monster-card">
                <div className="monster-header">
                    <h2 className="monster-name">{monster.name}</h2>
                    <span className="monster-level">Уровень {level}</span>
                </div>

                <div className="monster-top-section">
                    <div className="monster-image-container">
                        <div className="monster-image">
                            <img
                                src={monster.image}
                                alt={monster.name}
                                className="monster-img-full"
                            />
                            <div className="monster-glow"></div>
                        </div>
                    </div>

                    {/* Полоска здоровья справа от монстра */}
                    <div className="health-side-section">
                        <div className="health-stat-label">
                            <span className="health-icon">❤️</span>
                            <span className="health-numbers">{monster.health}/{monster.maxHealth}</span>
                        </div>
                        <div className="health-bar-vertical-wrapper">
                            <div className="health-bar-vertical-bg">
                                <div
                                    className="health-bar-vertical-fill"
                                    style={{
                                        height: `${healthPercentage}%`,
                                        backgroundColor: getHealthColor()
                                    }}
                                />
                            </div>
                        </div>
                        <div className="health-percentage">
                            {Math.round(healthPercentage)}%
                        </div>
                    </div>
                </div>

                

                <div className="monster-stats">
                   

                    <div className="attacks-section">
                        <h3 className="attacks-title">⚔️ Вопросы и задания</h3>
                        <div className="attacks-grid">
                            {monster.attacks.map((attack, index) => (
                                <div key={index}
                                     className="attack-card"
                                     onClick={() => {
                                         handleMonsterClick();

                                    }
                                    } >
                                    <div className="attack-name">{attack.name}</div>
                                    <div className="attack-damage">
                                        <span className="damage-icon">💢</span>
                                        {attack.damage} урона
                                    </div>
                                    <div className={`attack-type ${attack.type}`}>
                                        {attack.type === 'monolog' ? '⚡ Выступление' :
                                            attack.type === 'difficult' ? '🔥 Сложный' :
                                                attack.type === 'solo' ? '✨ Одна цель' : '✨ Обычный'}
                                                
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonsterDisplay;