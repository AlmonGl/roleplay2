import { doc, updateDoc, query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useState, useEffect } from 'react';
import { QuestionsTotal, Questions } from "../data/Questions.js"

function PlayerStatsBlock({player}) {
           

            return (
        <>  
                    <div style={{ borderTop: '2px dashed #999', margin: '15px 0' }} />  
             <div className="playerStats">
                
                        <div className="fantasy-text-block">
                            {player.rightLastAnswer == 5 ? '✅' : player.rightLastAnswer == 2 ? '❌' : '□'}
                            {`${player.status} | ${player.icon} | ${player.name} | ID: ${player.login}. | Hp: ${player.HP}. Sc: ${player.score}. Mov:${player.movePoints}. |   `}
                            {player.questionId && `Question: ${Questions[player.questionId].text}.`} {`| Answer: ${player.lastAnswer}.`} {player.questionId && ` | Right: ${Questions[player.questionId].right}. | `}
                            {` task: ${player.task} |`}{` act: ${player.currentAction} |   ввод: ${player.lastEnterAnswer} |`}
                            {`bonus: ${player.currentActionBonus}` }
                                
                               
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
                                        updateDoc(doc(db, "players", player.id), { status: "dialog", lastAnswer: "", questionId: Math.floor(Math.random() * QuestionsTotal), choiceIsMade: false });
                    }
                    }
                        className="btn">
                        Set random question
                                </button>
                                <button onClick={() => {
                                    updateDoc(doc(db, "players", player.id), { currentAction: "", lastAnswer: "-", rightLastAnswer: 0, currentActionBonus: -1 });
                    }
                    }
                        className="btn">
                        Refresh act/que
                    </button>

                                    {/*BUTTONS END*/}







                   


                     </div>
                     
                     
                                   
                     
            </div>
            </div>
            
            
        </>
    )
    
}
export default PlayerStatsBlock