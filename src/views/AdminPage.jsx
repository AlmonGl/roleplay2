
import Header from '../components/Header.jsx';
import { useSelector } from 'react-redux';

import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useEffect, useState } from "react";
import StatsManagment from '../components/StatsManagment.jsx';
import MapMaking from '../components/MapMaking.jsx';
import MapSelection from '../components/MapSelection.jsx';
import ActionSelector from '../components/ActionSelector.jsx';
import { handleEndOfRound, handleStartOfRound, setupQuestions } from '../functions/handleRound.js';
import { selectCurrentUserId } from '../store/usersSlice.js';
import { ItemsList } from '../data/ItemsList.js';


function AdminPage() {
    const currentUserId = useSelector(selectCurrentUserId);
    // const books = useSelector(selectBooks);
    const [players, setPlayers] = useState([]);
    const [isCheckedMap, setIsCheckedMap] = useState(false);
    const [isCheckedRating, setIsCheckedRating] = useState(false);
    const [isCheckedMonster, setIsCheckedMonster] = useState(false);

    useEffect(() => {
        onSnapshot(collection(db, "players"), (querySnap) => {
            let playerList = [];
            querySnap.forEach((it) => {

                playerList.push({ id: it.id, ...it.data() })

            })
            setPlayers(playerList);
        });

        const fetchData = async () => {
            const docSnap = await getDoc(doc(db, "players", currentUserId.toString()));
            
           setIsCheckedMap(docSnap.data().activeGlobalPageMap);

            setIsCheckedRating(docSnap.data().activeGlobalPageRating);
            setIsCheckedMonster(docSnap.data().activeGlobalPageMonster); 
            
        }
        fetchData();

        

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
                       
                        <div >
                            <label htmlFor="myCheck" style={{ fontSize: '14px', fontWeight: '500' }}>
                                Карта
                            </label>
                            <input
                                id="myCheck"
                                type="checkbox"
                                checked={isCheckedMap}
                                onChange={() => {

                                    updateDoc(doc(db, "players", currentUserId), { activeGlobalPageMap: !isCheckedMap });
                                    setIsCheckedMap(!isCheckedMap);
                                    
                                }}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    cursor: 'pointer'
                                }}
                            />
                        </div>
                        <div >
                            <label htmlFor="myCheck" style={{ fontSize: '14px', fontWeight: '500' }}>
                                Рейтинг
                            </label>
                            <input
                                id="myCheck"
                                type="checkbox"
                                checked={isCheckedRating}
                                onChange={() => {

                                    updateDoc(doc(db, "players", currentUserId), { activeGlobalPageRating: !isCheckedRating });
                                    setIsCheckedRating(!isCheckedRating);
                                    
                                }}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    cursor: 'pointer'
                                }}
                            />
                        </div>
                        <div >
                            <label htmlFor="myCheck" style={{ fontSize: '14px', fontWeight: '500' }}>
                                Монстр
                            </label>
                            <input
                                id="myCheck"
                                type="checkbox"
                                checked={isCheckedMonster}
                                onChange={() => {

                                    updateDoc(doc(db, "players", currentUserId), { activeGlobalPageMonster: !isCheckedMonster });
                                    setIsCheckedRating(!isCheckedMonster);

                                }}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    cursor: 'pointer'
                                }}
                            />
                        </div>

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
                                setupQuestions();
                            }}
                            className="btn">
                            вопросы
                        </button>
                       
                    </div>
                    <StatsManagment players={players} />

                </div>
                : <p>Loading...</p>
            }
        </>
    )
}
export default AdminPage

