import { doc, updateDoc, query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";

import { QuestionsTotal, QuestionsTopicCount } from "../data/Questions.js"


export function setupQuestions(players, questionSection, questionId, same) {
    const random = questionId == -1 ? true : false;
    const topic = questionSection == "" ? false : true;
    let id = questionId == -1 ? Math.floor(Math.random() * QuestionsTotal) : questionId;
    let topicIds = [];
    let topicQuestionId = 0;
    if (random && questionSection != '') {
        topicIds = QuestionsTopicCount.find(item => item.section == questionSection).ids;
        
        topicQuestionId = topicIds[Math.floor(Math.random() * topicIds.length)]
    }
    
    

        players.forEach((it) => {


            
            if (!random) {
                updateDoc(doc(db, "players", it.id.toString()),
                    { status: "dialog", questionId: id.toString(), rightLastAnswer: 0, lastAnswer: "", choiceIsMade: false, task: "", currentActionBonus: -1 });
                

            } else {
                if (!topic) {

                    updateDoc(doc(db, "players", it.id.toString()),
                        { status: "dialog", questionId: id.toString(), rightLastAnswer: 0, lastAnswer: "", choiceIsMade: false, task: "", currentActionBonus: -1 });
                    if (!same) {
                        id = Math.floor(Math.random() * QuestionsTotal);
                    }

                    // if topic
                } else {
                    updateDoc(doc(db, "players", it.id.toString()),
                        { status: "dialog", questionId: topicQuestionId.toString(), rightLastAnswer: 0, lastAnswer: "", choiceIsMade: false, task: "", currentActionBonus: -1 });

                    if (!same) {
                        topicQuestionId = topicIds[Math.floor(Math.random() * topicIds.length)];
                    } 
                   
                }
            }


            /*const rand = Math.floor(Math.random() * 101)
            if (rand > 85) {
                updateDoc(doc(db, "players", it.id.toString()),
                    { status: "task", taskId: id2.toString(), task: RoomTasks[id2].content, lastAnswer: "", choiceIsMade: false });
            } else {
                updateDoc(doc(db, "players", it.id.toString()),
                    { status: "dialog", questionId: id.toString(), lastAnswer: "", choiceIsMade: false, task: "" });
            }*/


        });



}

