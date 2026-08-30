
import Header from '../components/Header.jsx';
import { useSelector } from 'react-redux';

import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useEffect, useState } from "react";
import StatsManagment from '../components/StatsManagment.jsx';
import MapMaking from '../components/MapMaking.jsx';
import MapSelection from '../components/MapSelection.jsx';
import AdminCheckBoxes from '../components/AdminCheckBoxes.jsx';
import ChooseQuestionBlock from '../components/ChooseQuestionBlock.jsx';
import ActionSelector from '../components/ActionSelector.jsx';
import { handleEndOfRound, handleStartOfRound, setAllActiveIdle } from '../functions/handleRound.js';
import { handleSetWorldMap } from '../functions/handleWorldMap.js';

import { selectCurrentUserId } from '../store/usersSlice.js';
import { ItemsList } from '../data/ItemsList.js';




function AdminPage() {
    const currentUserId = useSelector(selectCurrentUserId);
    // const books = useSelector(selectBooks);
    const [players, setPlayers] = useState([]);

    

    useEffect(() => {
        onSnapshot(collection(db, "players"), (querySnap) => {
            let playerList = [];
            querySnap.forEach((it) => {

                playerList.push({ id: it.id, ...it.data() })

            })
            setPlayers(playerList);
        });

        

        

    }, []);

    const pageTitle = "Admin page";


    return (
        <>
            {players ?
                <div className="container">
                    <Header pageTitle={pageTitle} />

                    <ActionSelector players={players} />


                    <div className="admin-buttons">
                        <MapMaking />
                        <MapSelection />
                        <AdminCheckBoxes currentUserId={currentUserId} />
                        

                        <button
                            onClick={() => {
                                handleEndOfRound();
                            }}
                            className="btn">
                            Конец рауда(items)
                        </button>
                        <button
                            onClick={() => {
                                handleStartOfRound();
                            }}
                            className="btn">
                            новый раунд
                        </button>
                        <button
                            onClick={() => {
                                setAllActiveIdle(players.filter(pl => pl.active));
                            }}
                            className="btn">
                            Idle
                        </button>

                        
                        <button
                            onClick={() => {
                                handleSetWorldMap(players.filter(pl => pl.active));
                            }}
                            className="btn">
                            на world map
                        </button>
                        
                    </div>

                    <ChooseQuestionBlock />

                  
                    <StatsManagment players={players.filter(pl => pl.active)} />  
                </div>
                : <p>Loading...</p>
            }
        </>
    )
}
export default AdminPage

// 