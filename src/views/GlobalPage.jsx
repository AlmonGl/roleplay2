import FantasyMap from "../components/FantasyMap.jsx"
import Header from '../components/Header.jsx';
import Rating from '../components/Rating.jsx';
import MonsterDisplay from '../components/MonsterDisplay.jsx';
import WorldMap from '../components/WorldMap.jsx';
import { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../store/usersSlice.js';
import './GlobalPage.css';

import EnterChoiceDiagram  from "./EnterChoiceDiagram.jsx";


function GlobalPage() {
    const pageTitle = "Let's see what is going on.";
    const [admin, setAdmin] = useState([]);
    const [players, setPlayers] = useState([]);
    const currentUserId = useSelector(selectCurrentUserId);
    
    useEffect(() => {

        onSnapshot(doc(db, "players", currentUserId), (docSnap1) => {
            setAdmin({ ...docSnap1.data(), id: docSnap1.id });
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
    
	return (
		<>

            <div>

                


                {!admin.id || !players ? <p>Loading... </p>
                    :  

                        <div className="global-container">
                            {admin.activeGlobalPageMap  &&
                            <FantasyMap
                                    players={players.filter(pl => pl.active && pl.currentMap.toString() == admin.activeMap)}
                                    activeMap={admin.activeMap}
                                    showTooltips={true}
                                    gridSize={6}
                                    emptyCellSymbol="🌿"

                                />
                            }
                        
                            
                        {admin.activeGlobalPageMonster &&
                            <MonsterDisplay id={admin.currentMonster} health={admin.currentMonsterHP } players={players.filter(pl => pl.active) } />
                        }
                        {admin.activeGlobalPageWorldMap &&
                            <WorldMap admin={admin} players={players.filter(pl => pl.active)} />
                        }
                        {admin.activeEnterChoiceDiagram &&
                            <EnterChoiceDiagram players={players.filter(pl => pl.active)} admin={admin} />
                        }
                        {admin.activeGlobalPageRating &&
                        <Rating players={players.filter(pl => pl.active)} />
                        }



                        
                            
                        </div>
                        
                }
                    
			</div>
		</>
	)
}


export default GlobalPage


