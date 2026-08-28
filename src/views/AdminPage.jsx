
import Header from '../components/Header.jsx';
import { useSelector } from 'react-redux';

import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useEffect, useState } from "react";
import StatsManagment from '../components/StatsManagment.jsx';
import MapMaking from '../components/MapMaking.jsx';
import MapSelection from '../components/MapSelection.jsx';
import AdminCheckBoxes from '../components/AdminCheckBoxes.jsx';

import ActionSelector from '../components/ActionSelector.jsx';
import { handleEndOfRound, handleStartOfRound } from '../functions/handleRound.js';

import { setupQuestions } from '../functions/handleQuestions.js';
import { selectCurrentUserId } from '../store/usersSlice.js';
import { ItemsList } from '../data/ItemsList.js';
import './AdminPage.css';
import { QuestionsTopicCount, QuestionsTotal } from "../data/Questions.js"


function AdminPage() {
    const currentUserId = useSelector(selectCurrentUserId);
    // const books = useSelector(selectBooks);
    const [players, setPlayers] = useState([]);
   

    const [topic, setTopic] = useState('');
    const [qid, setQid] = useState('');

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

                                if (!qid) {
                                    setupQuestions(topic, -1);
                                } else 
                                if (qid >= 0 && qid <= QuestionsTotal) {
                                    setupQuestions(topic, qid);
                                } else {
                                    setupQuestions(topic, -1);
                                }
                                
                                console.log(topic, qid);
                            }}
                            className="btn">
                            вопросы
                        </button>
                       
                        
                    </div>
                    <div className="admin-text-field">
                        <input
                            type="text"
                            placeholder="номер"
                            value={qid}

                            onChange={(e) => setQid(e.target.value)}
                        />
                        
                        <select
                            className="select-actions2"
                            placeholder="темы"
                            onChange={(e) => setTopic(e.target.value)}
                        >
                            <option value="">topics</option>
                            {QuestionsTopicCount.map(y => (
                                <option key={y.id} value={y.topic}>{y.topic} ids: {y.idStart} {y.idFinish}</option>
                            ))}
                        </select>
                    </div>
                    <StatsManagment players={players} />  
                </div>
                : <p>Loading...</p>
            }
        </>
    )
}
export default AdminPage

