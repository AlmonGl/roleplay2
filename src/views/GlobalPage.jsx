import FantasyMap from "../components/FantasyMap.jsx"
import Header from '../components/Header.jsx';
import Rating from '../components/Rating.jsx';
import MonsterDisplay from '../components/MonsterDisplay.jsx';
import { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../store/usersSlice.js';
import './GlobalPage.css';




function GlobalPage() {
    const pageTitle = "Let's see what is going on.";
    const [player, setPlayer] = useState([]);
    const [players, setPlayers] = useState([]);
    const currentUserId = useSelector(selectCurrentUserId);
    
    useEffect(() => {

        onSnapshot(doc(db, "players", currentUserId), (docSnap1) => {
            setPlayer({ ...docSnap1.data(), id: docSnap1.id });
        });
              
    }, []); 

    useEffect(() => {
        onSnapshot(collection(db, "players"), (querySnap) => {
            let playerList = [];
            querySnap.forEach((it) => {


                if (it.data().login != "558899") {
                    playerList.push({ id: it.id, ...it.data() })
                }


            })
            setPlayers(playerList);

        });

    }, []);

    const handlePlayerClick = (player) => {
        console.log('Выбран игрок:', player);
    };

    const handleCellClick = (row, col) => {
        console.log(`Клетка [${row}][${col}] нажата`);
    };
    
	return (
		<>

            <div>

                


                {!player.id || !players ? <p>Loading... </p>
                    :  

                        <div className="global-container">
                            {player.activeGlobalPageMap  &&
                                <FantasyMap


                                    onPlayerClick={handlePlayerClick}
                                    onCellClick={handleCellClick}
                                    showTooltips={true}
                                    gridSize={6}
                                    emptyCellSymbol="🌿"

                                />
                            }
                        
                            
                        {player.activeGlobalPageMonster &&
                            <MonsterDisplay id={'004_1'} level={3} />
                            }
                            {player.activeGlobalPageRating &&
                                <Rating players={players} />
                            }


                            
                        </div>
                        
                }
                    
			</div>
		</>
	)
}


export default GlobalPage