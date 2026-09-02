
import './MonsterDisplay.scss';
import { soloMonsters } from "../data/MonsterList.js"
import { useState } from 'react';
const MonsterDisplay = ({ id, health, players }) => {


    const [selectedAttacks, setSelectedAttacks] = useState(new Set());

    const toggleAttack = (index) => {
        setSelectedAttacks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };


    const healthPercentage = (health / soloMonsters[id].maxHealth) * 100;

    const getHealthColor = () => {
        if (healthPercentage > 60) return '#4CAF50';
        if (healthPercentage > 30) return '#FF9800';
        return '#f44336';
    };

    function handleMonsterClick() {
        
    }

    return (
        <div className="monster-display-component">
            {!id ? <p>Loading... </p> :
        <div className="monster-container">

            
            <div className="monster-card">
                <div className="monster-header">
                            <h2 className="monster-name">{soloMonsters[id].name}</h2>
                    <span className="monster-level">Уровень {soloMonsters[id].level}</span>
                </div>

                <div className="monster-top-section">
                    <div className="monster-image-container">
                        <div className="monster-image">
                            <img
                                src={`/assets/monsters/${soloMonsters[id].imageId}.png`}
                                alt={soloMonsters[id].name}
                                className="monster-img-full"
                            />
                            <div className="monster-glow"></div>
                        </div>
                    </div>

                    {/* Полоска здоровья справа от монстра */}
                    <div className="health-side-section">
                        <div className="health-stat-label">
                            <span className="health-icon">❤️</span>
                            <span className="health-numbers">{health}/{soloMonsters[id].maxHealth}</span>
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
                    <div className = 'answer-icons'>
                        {players.map(player => player.rightLastAnswer == 5 ? '✅' : player.rightLastAnswer == 2 ? '❌' : '')}
                    </div>
                </div>

                

                <div className="monster-stats">
                   

                    <div className="attacks-section">
                        <h3 className="attacks-title">⚔️ Вопросы и задания</h3>
                        <div className="attacks-grid">
                            {soloMonsters[id].attacks.map((attack, index) => (
                                <div key={index}
                                    className={`attack-card ${selectedAttacks.has(index) ? 'selected' : ''}`}
                                     onClick={() => {
                                         handleMonsterClick();
                                         toggleAttack(index);
                                         console.log(12);
                                    }
                                    } >
                                    <div className="attack-name">{attack.name}</div>
                                    <div className="attack-damage">
                                        <span className="damage-icon">💢</span>
                                        {attack.damage} урона
                                    </div>
                                    <div className={`attack-type ${attack.type}`}>
                                        {attack.type === 'Разные вопросы (командный итог)' ? '✨ Разные вопросы (командный итог)' :
                                            attack.type === 'Разные вопросы' ? '✨ Разные вопросы' :
                                                attack.type === 'Один вопрос всем (командный итог)' ? '⚡ Один вопрос всем (командный итог)' :
                                                    attack.type === 'Один вопрос всем' ? '⚡ Один вопрос всем' :
                                                        attack.type === 'Карта (командный итог)' ? '🗺️ Карта (командный итог)' :
                                                            attack.type === 'Карта' ? '🗺️ Карта' :
                                                    '⚽ error'}

                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
        </div>
    );
};

export default MonsterDisplay;