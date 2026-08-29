import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc  } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useState, useEffect} from 'react';
import './ChoicePage.css';
import { Questions } from "../data/Questions.js"



function ChoicePage ({player}) {
    
    
    
    const [question, setQuestion] = useState("");
    function handleTestChoice(e, choice) {
        e.preventDefault();
        updateDoc(doc(db, "players", player.id), {
            status: 'idle',
            choiceIsMade: true,
            lastAnswer: `${choice}`,
            rightLastAnswer: choice == question.right ? 5 : 2
        });
        setQuestion("");

    }
    useEffect(() => {
      
      onSnapshot(doc(db, "players",player.id),  (docSnap) => {
       
       loadQuestion(docSnap.data().questionId.toString());   
          
      });  
      }, []);
      function loadQuestion(id)  {
                     
          setQuestion(Questions[id]);
     
    }
    const randomOrders = () => {
        const orders = {};
        for (let i = 1; i <= 6; i++) {
            orders[`--order-${i}`] = Math.floor(Math.random() * 6);
        }
        return orders;
    };

    return(
        <>
        
            <h3>Есть вопрос для вас, {player.name }:</h3>
            <br />
            <h3>Тема вопроса: {question.topic || "общий вопрос"}.</h3>
            <br />
        {
        player.choiceIsMade ? 

        <h3> Спасибо. Ждём других игроков.</h3> 
        
                    :
                    question ?
                    <div>
                            <h3>{question.text} </h3>
                            <br />
                            <div className="answers-container" style={randomOrders()}>
                            
                             
                                <button className="answer-btn test-button"  onClick = {(e) => handleTestChoice(e, question.v1 )} >
                          {question.v1}
                      </button>
                                <button className="answer-btn test-button" onClick = {(e) => handleTestChoice(e, question.v2 )} >
                          {question.v2}
                      </button>
                                <button className="answer-btn test-button" onClick = {(e) => handleTestChoice(e, question.v3 )} >
                          {question.v3}
                      </button>
                                <button className="answer-btn test-button" onClick = {(e) => handleTestChoice(e, question.v4 )} >
                          {question.v4}
                                </button>
                                {question.v5 && <button className="answer-btn test-button" onClick={(e) => handleTestChoice(e, question.v5)} >
                                    {question.v5}
                                </button>}
                                {question.v6 && <button className="test-button answer-btn" onClick={(e) => handleTestChoice(e, question.v6)} >
                                    {question.v6}
                                </button>}

                                
                            </div>
        </div>
        : <p> Loading....</p> 
        }
        </>
        
    )
}

export default ChoicePage