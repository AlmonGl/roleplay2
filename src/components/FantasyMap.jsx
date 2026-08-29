import { useState, useEffect } from 'react';
import './FantasyMap.css';
import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { monstersList } from '../data/MonsterList.js';
import { treasureList } from '../data/TreasureList.js';
function FantasyMap ({
   
    players,
    activeMap,
    showTooltips,
    gridSize,
    emptyCellSymbol
})  {
  
    //const [players, setPlayers] = useState([]);
    const [map, setMap] = useState();
     

   // const [activeMap, setActiveMap] = useState("0");

   /* useEffect(() => {

        onSnapshot(doc(db, "players", "S2y1gyVwUbpJa4jf9v8y"), (docSnap1) => {
            setActiveMap(docSnap1.data().activeMap);
        });

    }, []);*/



    
  /*  useEffect(() => {
        onSnapshot(collection(db, "players"), (querySnap) => {
            let playerList = [];
           
            querySnap.forEach((it) => {

               
                if (it.data().currentMap.toString() == activeMap.toString() && it.data().login != "558899") { 
                    playerList.push({ id: it.id, ...it.data() })
                }
                
                
            })
            setPlayers(playerList);
            
        });

    }, [activeMap]);*/


    const regenerateMap = async () => {

        if (activeMap != "0") { 

        const mapSnap = await getDoc(doc(db, "maps", activeMap));
        const mapData = mapSnap.data();
        
        const map1 =[];
        for (let i = 0; i < gridSize; i++) {
            const row = [];
            for (let j = 0; j < gridSize; j++) {
                row.push({
                    
                       type: 'empty',
                    treasure: mapData[i][j].treasure,
                    
                    monster: mapData[i][j].monster,
                    exit: mapData[i][j].exit,
                    
                    player: null,
                    players: []
                    
                });
            }
            map1.push(row); 
        }
        players.forEach((player) => {


            if (player.row < gridSize && player.col < gridSize) {

                map1[player.row][player.col].player = player;
                map1[player.row][player.col].players.push({ ...player, id: player.id });
                map1[player.row][player.col].type = 'occupied';

            }
        });
        setMap(map1);
        setDoc(doc(db, "maps", activeMap), { ...map1 });
        }
    }
    useEffect(() => {
        regenerateMap();
    }, []);

    
    console.log(map);
    // Размещение игроков на карте
    useEffect(() => {

        regenerateMap();

        }
    , [players, gridSize]);

  

    return (
        <>
            {players && map ?
                <div className="fantasy-map-container">
                    <h2 className="map-title">🗺️ Карта приключений. Уровень {activeMap}.</h2>
                                       
                    <div className="fantasy-map">
                        {map.map((row, rowIndex) => (
                            <div key={rowIndex} className="map-row">
                                {row.map((cell, colIndex) => {
                                   

                                    return (
                                        <div
                                            key={`${rowIndex}-${colIndex}`}
                                            className={`map-cell  ${cell.treasure != -1 ? 'treasure' : ''} ${cell.monster != -1 ? 'monster' : ''} ${cell.exit ? 'exit' : ''}`}
                                            
                                        >
                                            {cell.player && (cell.players.length <= 1) ? 
                                                <div
                                                    className={`player-token`}
                                                    style={{ backgroundColor: cell.player.color || '#4CAF50' }}
                                                   
                                                >
                                                    <span className="player-icon">{cell.player.icon || '🧙'}</span>
                                                    <span className="player-name">{cell.player.name || `P${cell.player.id}`}</span>
                                                    {cell.player.level && (
                                                        <span className="player-level">LVL {cell.player.level}</span>
                                                    )}
                                                </div>
                                                : cell.players.length == 2 ? 

                                                    
                                                       
                                                    <div
                                                        className={`player-token rainbow-diagonal`

                                                        }
                                                        style={{background: `linear-gradient(to right, ${cell.players[0].color} 50%, ${cell.players[1].color} 50%)` }}     
                                                    >
                                                    
                                                        <div className="cell-party "
                                                            style={{
                                                                display: 'grid',
                                                                gridTemplateColumns: 'repeat(2, 1fr)',
                                                                gridTemplateRows: 'repeat(2, 1fr)'
                                                            }}>
                                                            {cell.players.map((it) => <span key={it.id} className="player-icon">{it.icon}</span> )}
                                                     </div>   
                                                    </div>
                                                    : cell.players.length == 3 ?
                                                    <div
                                                        className={`player-token`}
                                                            style={{ background: `linear-gradient(to right, ${cell.players[0].color} 33%, ${cell.players[1].color} 33% 66%,${cell.players[2].color} 66%)` }}     
                                                    >
                                                    
                                                            <div className="cell-party "
                                                                style={{
                                                                    display: 'grid',
                                                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                                                    gridTemplateRows: 'repeat(2, 1fr)'
                                                                }}

                                                            >
                                                            {cell.players.map((it) => <span key={it.id} className="player-icon">{it.icon}</span> )}
                                                     </div>
                                                </div>
                                                        : cell.players.length == 4 ?
                                                            <div
                                                                className={`player-token`}
                                                                style={{ background: `linear-gradient(to right, ${cell.players[0].color} 25%, ${cell.players[1].color} 25% 50%,${cell.players[2].color} 50% 75%, ${cell.players[3].color} 75%)` }}
                                                            >

                                                                <div className="cell-party "
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                                                        gridTemplateRows: 'repeat(2, 1fr)'
                                                                    }}>
                                                                    {cell.players.map((it) => <span key={it.id} className="player-icon">{it.icon}</span>)}
                                                                </div>
                                                            </div>


                                                            : cell.players.length > 5 ?
                                                                <div
                                                                    className={`player-token`}
                                                                 
                                                                >

                                                                    <div className="cell-party "
                                                                        style={{
                                                                            display: 'grid',
                                                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                                                            gridTemplateRows: 'repeat(2, 1fr)'
                                                                        }}>
                                                                        {cell.players.map((it) => <span key={it.id} className="player-icon">{it.icon}</span>)}
                                                                    </div>
                                                                </div>
                                                            :
                                                                <div >
                                                                    {
                                                                        cell.treasure != -1 ?
                                                                            <div
                                                                                className='neutral-token'
                                                                                style={{ backgroundColor: treasureList[cell.treasure].color || '#4CAF50' }}

                                                                            >
                                                                                <span className="player-icon">{treasureList[cell.treasure].emoji || '⚡error'}</span>
                                                                                <span className="enemy-name"> LOOT</span>

                                                                            </div>



                                                                            : cell.exit ?
                                                                                <div
                                                                                className='exit-token'>
                                                                                    <span className="exit-icon">{'⛩️'}</span>
                                                                                <span className="enemy-name"> EXIT</span>

                                                                            </div>
                                                                                


                                                                                : cell.monster != -1 ?
                                                                                    
                                                                                    <div
                                                                                        className='neutral-token'
                                                                                        
                                                                                        style={{ backgroundColor: monstersList[cell.monster].color || '#4CAF50' }}
                                
                                                                                    >
                                                                                        
                                                                                        <span className="player-icon">{monstersList[cell.monster].emoji || '⚡error'}</span>
                                                                                        <span className="enemy-name"> Enemy</span>
                                                                                        
                                                                                    </div>


                                                                                   


                                                                                    : <div className='empty-cell'>{emptyCellSymbol}</div> }
                                                </div>
                                            }
                                           


                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                   
                </div>
                : <p>Loading....</p>
            }
        </>
            );
}

export default FantasyMap

