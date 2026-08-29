
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
import { handleEndOfRound, handleStartOfRound } from '../functions/handleRound.js';


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
                        
                    </div>

                    <ChooseQuestionBlock />

                    {players.map(player => player.rightLasAnswer == 5 ? '✅' : player.rightLasAnswer == 2 ? '❌' : '')}
                    <StatsManagment players={players.filter(pl => pl.active)} />  
                </div>
                : <p>Loading...</p>
            }
        </>
    )
}
export default AdminPage

