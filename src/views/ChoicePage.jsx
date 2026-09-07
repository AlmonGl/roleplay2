import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc  } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useState, useEffect, useMemo } from 'react';
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
    const selectedWrongKeys = useMemo(() => {
        if ((player.currentActionBonus != 11 && player.currentActionBonus != 12) || !question) {
            
            return [];
        }

        const allVariants = [
            { key: 'v1', value: question.v1 },
            { key: 'v2', value: question.v2 },
            { key: 'v3', value: question.v3 },
            { key: 'v4', value: question.v4 },
            { key: 'v5', value: question.v5 },
            { key: 'v6', value: question.v6 }
        ].filter(item => item.value !== undefined && item.value !== null && item.value !== question.right);

        // Перемешиваем и берём первые 3
        const shuffled = [...allVariants].sort(() => Math.random() - 0.5);
       
        if (player.currentActionBonus == 11) {
           
            return shuffled.slice(0, 1).map(item => item.key);
            
            
        }
        if (player.currentActionBonus == 12) {
            
            return shuffled.slice(0, 3).map(item => item.key);

        }
        
    }, [question, player.currentActionBonus]);

    // Функция проверки, нужно ли добавить класс wrong-answer для конкретного варианта
    const isWrongVariant = (key) => {
        
        return ((player.currentActionBonus == 11 || player.currentActionBonus == 12) && selectedWrongKeys.includes(key))
    };
    return(
        <>
        
            <h3>Есть вопрос для вас, {player.name}
            :</h3>
            <br />
            <h3>Тема вопроса: { `${question.section}. ${question.topic}`   || "Общий вопрос"}.</h3>
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
                            
                             
                                <button
                                    className={`answer-btn test-button ${isWrongVariant('v1') ? 'wrong-answer' : ''}`}
                                    onClick={(e) => handleTestChoice(e, question.v1)} >
                                    {question.v1}
                                </button>

                                <button
                                    className={`answer-btn test-button ${isWrongVariant('v2') ? 'wrong-answer' : ''}`}
                                    onClick={(e) => handleTestChoice(e, question.v2)} >
                                     {question.v2}
                                </button>

                                <button
                                    className={`answer-btn test-button ${isWrongVariant('v3') ? 'wrong-answer' : ''}`}
                                    onClick={(e) => handleTestChoice(e, question.v3)} >
                                      {question.v3}
                                </button>

                                <button
                                    className={`answer-btn test-button ${isWrongVariant('v4') ? 'wrong-answer' : ''}`}
                                    onClick={(e) => handleTestChoice(e, question.v4)} >
                                        {question.v4}
                                </button>
                                {question.v5 &&
                                    <button
                                        className={`answer-btn test-button ${isWrongVariant('v5') ? 'wrong-answer' : ''}`}
                                        onClick={(e) => handleTestChoice(e, question.v5)}>
                                             {question.v5}
                                    </button>}

                                {question.v6 &&
                                    <button
                                        className={`answer-btn test-button ${isWrongVariant('v6') ? 'wrong-answer' : ''}`}
                                        onClick={(e) => handleTestChoice(e, question.v6)} >
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