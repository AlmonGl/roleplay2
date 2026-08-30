import  { useState, useEffect } from 'react';
import  './WorldMap.scss';

// Импорт изображения карты (если есть)
//import worldMapImage from '../assets/maps/world-map.png';
//`/assets/monsters/${id}.png`
const WorldMap = ({ id, players }) => {
    // Список игроков с координатами


    // Состояние для выбранного игрока


    // Анимация пульсации для онлайн игроков
    useEffect(() => {
        const interval = setInterval(() => {
            // Можно обновлять позиции игроков или другие данные
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        {!players ? <p>Loading... </p>
        :
        <div className="world-map">
            <div className="worldmap-container">
                <div className="worldmap-card">
                    {/* Заголовок карты */}
                    <div className="worldmap-header">
                        <h2 className="worldmap-title">🗺️ Карта мира</h2>
                        <div className="worldmap-stats">

                            <span className="stat-item">👥 Всего: {players.length}</span>
                        </div>
                    </div>

                    {/* Карта */}
                    <div className="map-container">
                        {/* Изображение карты */}
                        <div className="map-background">
                            {/* Если есть изображение карты */}
                            <img src={`/assets/maps/${id}.png`} alt="Карта мира" className="map-image" />


                        </div>

                        {/* Игроки на карте */}
                        {players.map((player) => (
                            <div
                                key={player.id}
                                className={`player-marker-wm`}
                                style={{
                                    left: `${player.x}%`,
                                    top: `${player.y}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}

                            >

                                {/* Иконка игрока */}
                                <div className="player-icon-wm" style={{ backgroundColor: player.color }}>
                                    {player.icon }
                                </div>

                                {/* Имя игрока (показывается при наведении) */}
                                <div className="player-tooltip-wm">
                                    <span className="player-name-wm">{player.name}</span>
                                    
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    }
        </>);
};

export default WorldMap;



                               /* 
                                 Или SVG карта 
<svg className="map-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
     Континенты 
    <path d="M10,20 Q20,10 35,15 Q45,25 40,40 Q30,45 20,35 Q10,30 10,20Z" fill="rgba(74,44,26,0.3)" stroke="#4a2c1a" strokeWidth="0.5" />
    <path d="M50,10 Q65,5 80,15 Q85,30 70,40 Q55,35 50,20 Q48,15 50,10Z" fill="rgba(74,44,26,0.3)" stroke="#4a2c1a" strokeWidth="0.5" />
    <path d="M15,50 Q30,45 45,55 Q50,70 35,80 Q20,75 15,60 Q12,55 15,50Z" fill="rgba(74,44,26,0.3)" stroke="#4a2c1a" strokeWidth="0.5" />
    <path d="M60,55 Q75,50 85,65 Q80,80 65,85 Q55,75 60,55Z" fill="rgba(74,44,26,0.3)" stroke="#4a2c1a" strokeWidth="0.5" />

     Границы регионов 
    <line x1="10" y1="20" x2="85" y2="75" stroke="rgba(74,44,26,0.2)" strokeWidth="0.3" strokeDasharray="1,1" />
    <line x1="15" y1="50" x2="80" y2="15" stroke="rgba(74,44,26,0.2)" strokeWidth="0.3" strokeDasharray="1,1" />
    <line x1="35" y1="15" x2="35" y2="80" stroke="rgba(74,44,26,0.2)" strokeWidth="0.3" strokeDasharray="1,1" />
    <line x1="60" y1="10" x2="60" y2="85" stroke="rgba(74,44,26,0.2)" strokeWidth="0.3" strokeDasharray="1,1" />

     Легенда 
    <text x="2" y="95" fill="#8a6e4b" fontSize="3">🌲 Лес</text>
    <text x="25" y="95" fill="#8a6e4b" fontSize="3">⛰️ Горы</text>
    <text x="50" y="95" fill="#8a6e4b" fontSize="3">🏰 Замок</text>
    <text x="75" y="95" fill="#8a6e4b" fontSize="3">🏝️ Остров</text>
</svg>*/
                                
                                
                                