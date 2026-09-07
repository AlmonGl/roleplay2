import './AdminPage.css';

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
import AddPlayer from '../components/AddPlayer.jsx';
import { handleStartOfRound, setAllActiveIdle, setAllActiveEnterAnswer, setAllToVariant } from '../functions/handleRound.js';
import { handleSetWorldMap } from '../functions/handleWorldMap.js';

import { selectCurrentUserId } from '../store/usersSlice.js';
import { ItemsList } from '../data/ItemsList.js';

import { WorldMaps } from '../data/Images.js';




function AdminPage() {
    
    const [admin, setAdmin] = useState([]);
    const currentUserId = useSelector(selectCurrentUserId);
    const [players, setPlayers] = useState([]);

    
    const [selectedMap, setSelectedMap] = useState('0');
    const handleChangeMap = (e) => {
        setSelectedMap(e.target.value);

    };

    
    useEffect(() => {
        onSnapshot(collection(db, "players"), (querySnap) => {
            let playerList = [];
            querySnap.forEach((it) => {

                playerList.push({ id: it.id, ...it.data() })

            })
            setPlayers(playerList);
        });

    }, []);

    useEffect(() => {

        onSnapshot(doc(db, "players", currentUserId), (docSnap1) => {
            setAdmin({ ...docSnap1.data(), id: docSnap1.id });
        });

    }, []); 
    const pageTitle = "Admin page";


    return (
        <>
            {players && admin ?
                <div className="container">
                    <Header pageTitle={pageTitle} />

                    <ActionSelector players={players} />


                    <div className="admin-buttons">
                        <MapMaking />
                        <MapSelection />
                        <AdminCheckBoxes currentUserId={currentUserId} />
                        
                       

                        
                        
                    </div>
                    <div className="admin-buttons">
                        <div>
                            <button
                                onClick={() => {
                                    handleStartOfRound(players.filter(pl => pl.active));
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
                                    setAllToVariant(players.filter(pl => pl.active));
                                    
                                }}
                                className="btn">
                                Выбор варианта 1-4
                            </button>

                            <button
                                onClick={() => {
                                    handleStartOfRound(players.filter(pl => pl.active));
                                    setAllActiveEnterAnswer(players.filter(pl => pl.active));
                                    
                                }}
                                className="btn">
                                Поле для ответа
                            </button>
                            <div>
                                <select className="select-actions2" value={selectedMap} onChange={handleChangeMap}>
                                    <option value="-1">Maps</option>
                                    {
                                        WorldMaps.map(m =>

                                            <option key={`${m.id}`} value={m.id}>{m.name}</option>
                                        )
                                    }

                                </select>

                                <button
                                    onClick={() => {
                                        if (selectedMap != -1) {

                                            handleStartOfRound(players.filter(pl => pl.active));
                                            handleSetWorldMap(players.filter(pl => pl.active), selectedMap, admin.id);
                                        }
                                    }}
                                    className="btn">
                                    на world map
                                </button>


                            </div>



                        </div>
                        <AddPlayer />
                        
                    </div>
                    <ChooseQuestionBlock admin={admin} players={players.filter(pl => pl.active)} />

                 
                    <StatsManagment admin={admin} players={players.filter(pl => pl.active)} />  
                </div>
                : <p>Loading...</p>
            }
        </>
    )
}
export default AdminPage

// 