import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import './NavigateButtons.css';
import { useState } from 'react';
import { IdleMessages } from '../data/IdleMessages.js';


function NavigateButtons({ player }) {



    const handlePlayerMovement = async (direction) => {

        const mapSnap = await getDoc(doc(db, "mapInfos", player.currentMap.toString()));
        const size = mapSnap.data().size;
        
        console.log(size);
        switch (direction) {
            case "North":
                if (player.row != 0) {
                    //if (mapData[player.row - 1][player.col].type == 'empty') {
                    updateDoc(doc(db, "players", player.id), { row: player.row - 1, movePoints: player.movePoints - 1, status: player.movePoints == 1 ? "idle" : 'navigate' });
                    // }
                }
                break;

            case "South":
                if (player.row != 5) {
                    // if (mapData[player.row + 1][player.col].type == 'empty') {
                    updateDoc(doc(db, "players", player.id), { row: player.row + 1, movePoints: player.movePoints - 1, status: player.movePoints == 1 ? "idle" : 'navigate' });
                   
                    // }
                }
                break;

            case "West":
                if (player.col != 0) {
                    // if (mapData[player.row][player.col - 1].type == 'empty') {
                    updateDoc(doc(db, "players", player.id), { col: player.col - 1, movePoints: player.movePoints - 1, status: player.movePoints == 1 ? "idle" : 'navigate' });
                    // }
                }
                break;

            case "East":
                if (player.col != 5) {
                    // if (mapData[player.row][player.col + 1].type == 'empty') {
                    updateDoc(doc(db, "players", player.id), { col: player.col + 1, movePoints: player.movePoints - 1, status: player.movePoints == 1 ? "idle" : 'navigate' });
                    //  }
                }
                break;
        }

        /* const mapSnap2 = await getDoc(doc(db, "maps", player.currentMap.toString()));
         const mapData = mapSnap2.data();
         mapData[player.row][player.col].player = null;
         mapData[player.row][player.col].type = 'empty';
         setDoc(doc(db, "maps", "1"), { ...mapData });*/
    }

    return (
        <>
            <h3>{`У вас ${player.movePoints} ${player.movePoints == 1 ? "ход" : player.movePoints == 0 ? "ходов" : "хода"}`}</h3>
            {player.movePoints != 0 ?
                < button onClick={() => {

                    updateDoc(doc(db, "players", player.id), { movePoints: 0, status: 'idle' });

                }}
                        className="btn">
            
            Остаться на месте
                </button > :<></>
            }


            {player.movePoints != 0 ?
                <div className="compass-controls">
                    <button onClick={() => {



                        handlePlayerMovement("North");



                    }}
                        className="compass-btn btn-north">
                        <span className="direction-icon">⬆</span>
                        <span className="direction-label">СЕВЕР</span>
                    </button>

                    <button onClick={() => {

                        handlePlayerMovement("South");



                    }}
                        className="compass-btn btn-south">
                        <span className="direction-icon">⬇</span>
                        <span className="direction-label">ЮГ</span>
                    </button>

                    <button onClick={() => {

                        handlePlayerMovement("West");

                    }}
                        className="compass-btn btn-west">
                        <span className="direction-icon">⬅</span>
                        <span className="direction-label">ЗАПАД</span>
                    </button>

                    <button onClick={() => {

                        handlePlayerMovement("East");

                    }}
                        className="compass-btn btn-east">
                        <span className="direction-icon">➡</span>
                        <span className="direction-label">ВОСТОК</span>
                    </button>

                    <div className="btn-center">⚔️</div>
                </div>
                : <div><h3>Ходы закончились, ждите других игроков.</h3>
                    <h3>Вот вам небольшое ненастоящее задание:</h3>
                    <h3>{IdleMessages[Math.floor(Math.random() * 100)].text}</h3>
                </div>
            }
        </>
    )

}

export default NavigateButtons