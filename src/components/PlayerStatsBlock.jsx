import { doc, updateDoc, query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";
import {useState, useEffect}  from 'react';


function PlayerStatsBlock({player}) {
           
    
    const [selectedMap, setSelectedMap] = useState('0');
          
    
    const [maps, setMaps] = useState('');
          {console.log(999);}

          
            

    const handleChangeMap = (e) => {
        setSelectedMap(e.target.value);

    }; 
               
           
            
            function handleSetMap() {

                if (selectedMap != "0") {
                    updateDoc(doc(db, "players", player.id), { status: "navigate", currentMap: selectedMap.toString() });

                }

                
    }

        useEffect(() => {
        const fetchData = async () => {
            
            
                        

            const q2 = query(collection(db, "maps"));
            const querySnapshot2 = await getDocs(q2);
            let mapsList = [];
            querySnapshot2.forEach((it) => {
                mapsList.push({ id: it.id})
                
            });
            setMaps(mapsList);
        }
        fetchData();

    }, []);



            return (
        <>  
           {  maps ?
             <div className="playerStats">
                
                            <div className="fantasy-text-block">
                                {`${player.status}${player.icon} ${player.name} ID: ${player.login}. Hp: ${player.HP}. Sc: ${player.score}. Mov:${player.movePoints}. Answer: ${player.lastAnswer}     `}
                                {` task: ${player.task}     `}{` act: ${player.currentAction}     `}

                                
                               
                 </div>
                           
                                {player.items ?
                                     <div className="fantasy-text-block">
                                    {player.items.map((item) => (
                                        <div key={item.id}>
                                            {item.name}
                                        </div>))}
                                </div>
                                : <div></div>
                                }




                            
                 <div className="player-details">
                     
                     
                  <div> 

                                    {/*BUTTONS*/ }
                     <button onClick={() => {
                         updateDoc(doc(db, "players", player.id), { HP: player.HP - 1 });
                     }}
                         className="btn">
                         -HP
                     </button>
                     <button onClick={() => {
                         updateDoc(doc(db, "players", player.id), { HP: player.HP + 1 });
                     }
                     }
                         className="btn">
                         +HP
                     </button>
                    <button onClick={() => {
                        updateDoc(doc(db, "players", player.id), { score: player.score - 1 });
                    }
                    }
                        className="btn">
                        -SC
                    </button>
                    <button onClick={() => {
                        updateDoc(doc(db, "players", player.id), { score: player.score + 1 });
                    }
                    }
                        className="btn">
                        +SC
                    </button>
                     <button onClick={() => {
                                        updateDoc(doc(db, "players", player.id), { status: "dialog", lastAnswer: "", questionId: Math.floor(Math.random() * 400), choiceIsMade: false });
                    }
                    }
                        className="btn">
                        Set random question
                    </button>

                                    {/*BUTTONS END*/}







                   
                      <div className = "select-question-text">

     
      





                                        <select value={selectedMap} onChange={handleChangeMap}>
                                            <option value="0">Maps</option>
                                            {
                                                maps.map(m =>

                                                    <option key={`${m.id}+${player.id}`} value={m.id}>{m.id}</option>
                                                )
                                            }

                                        </select>
                                        <p>Выбор: {(selectedMap) || 'no'}</p>
                                        <button onClick={handleSetMap}


                                            className="btn">
                                            Navigate
                                        </button> 



    </div>


                     </div>
                     
                     
                                   
                     
            </div>
            </div>
            : <p>Loading....</p>
            }
        </>
    )
    
}
export default PlayerStatsBlock