import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc  } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useState, useEffect, useMemo } from 'react';
import './ChoicePage.css';
import { Questions } from "../data/Questions.js"



function ChoiceVariantPage ({player}) {
    
    
    
   
    function handleTestChoice(e, choice) {
        e.preventDefault();
        updateDoc(doc(db, "players", player.id), {
            status: 'idle',
            choiceIsMade: true,
            lastAnswer: choice,
            rightLastAnswer: choice
        });
        setQuestion("");

    }
    
   
    

    // Функция проверки, нужно ли добавить класс wrong-answer для конкретного варианта
   
    return(
        <>
        
            <h3>Проголосуйте за вариант следующего задания, {player.name}
            :</h3>
            <br />
           
        {
        player.choiceIsMade ? 

        <h3> Спасибо. Ждём других игроков.</h3> 
        
                    :
                    player ?
                    <div>
                           
                            <br />
                            <div className="answers-container">
                            
                             
                                <button
                                    className={`answer-btn test-button`}
                                    onClick={(e) => handleTestChoice(e, 'v1')} >
                                    Вариант 1
                                </button>

                                <button
                                    className={`answer-btn test-button `}
                                    onClick={(e) => handleTestChoice(e, 'v2')} >
                                    Вариант 2
                                </button>

                                <button
                                    className={`answer-btn test-button `}
                                    onClick={(e) => handleTestChoice(e,'v3')} >
                                    Вариант 3
                                </button>

                                <button
                                    className={`answer-btn test-button `}
                                    onClick={(e) => handleTestChoice(e, 'v4')} >
                                    Вариант 4
                                </button>
                                

                                
                            </div>
        </div>
        : <p> Loading....</p> 
        }
        </>
        
    )
}

export default ChoiceVariantPage