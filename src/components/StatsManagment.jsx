import { doc, updateDoc, query, collection, getDocs, onSnapshot, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config.js";
import PlayerStatsBlock from './PlayerStatsBlock.jsx';
import { useState, useEffect } from 'react';
import { ItemsList } from "../data/ItemsList.js"



function StatsManagment({ admin, players }) {
    
        
    
        
    
    return (
      <>

            <h1>Stats: {players.map(player => player.rightLastAnswer == 5 ? '✅' : player.rightLastAnswer == 2 ? '❌' : '')}</h1>
            <div style={{ borderTop: '2px dashed #999', margin: '15px 0' }} />
            <div className="stats-container">
                <div className="player-list">
                    
                    <div style={{ backgroundColor: 'bisque' }} >
                        <button onClick={() => {
                           players.forEach((pl) => updateDoc(doc(db, "players", pl.id), { score: pl.score - 1 }));
                        }
                        }
                            className="btn">
                            -SC
                        </button>
                        <button onClick={() => {
                            players.forEach((pl) => updateDoc(doc(db, "players", pl.id), { score: pl.score + 1 }));
                        }
                        }
                            className="btn">
                            +SC
                        </button>
                        <button onClick={() => {
                            players.forEach((pl) => updateDoc(doc(db, "players", pl.id), { HP: pl.HP - 1 }));
                        }
                        }
                            className="btn">
                            -HP
                        </button>
                        <button onClick={() => {
                            players.forEach((pl) => updateDoc(doc(db, "players", pl.id), { HP: pl.HP + 1 }));
                        }
                        }
                            className="btn">
                            +HP
                        </button>
                        <button onClick={() => {
                            players.forEach((pl) =>
                                updateDoc(doc(db, "players", pl.id), {
                                    items: arrayUnion(ItemsList[Math.floor(Math.random() * ItemsList.length)])
                                }

                                ));
                        }
                        }
                            className="btn">
                            +item to all
                        </button>
                        <button onClick={() => {
                            updateDoc(doc(db, "players", admin.id), { symbols: admin.symbols + " ☠️" })
                        }
                        }
                            className="btn">
                            +☠️
                        </button>
                        <button onClick={() => {
                            updateDoc(doc(db, "players", admin.id), { symbols:  admin.symbols + " 🏆" })
                        }
                        }
                            className="btn">
                            +🏆
                        </button>
                        <button onClick={() => {
                            updateDoc(doc(db, "players", admin.id), { symbols: "" })
                        }
                        }
                            className="btn">
                            del sym
                        </button>
                    </div>
                    
                  

                    {players.map(player =>
                        
                        <PlayerStatsBlock key={player.id} player={player} />

                        )}

                    </div>
                </div>
           
    
      </>
    )
  }
  
  export default StatsManagment