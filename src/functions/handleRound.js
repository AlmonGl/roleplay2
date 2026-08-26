import { doc, updateDoc, query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { RoomTasks } from "../data/RoomTasks.js"
export function handleEndOfRound() {
    

    const setRoundEnd = async () => {

        const q = query(collection(db, "players"));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((it) => {

            updateDoc(doc(db, "players", it.id), { movePoints: 0, status: "item-use" });
            
        });
        

    }
    setRoundEnd()



}


export function handleStartOfRound() {
    

    const setRoundStart = async () => {

        const q = query(collection(db, "players"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((it) => {
            let extraMove = false;
            let restrained = false;
            if (it.data().items) {
                if (it.data().items.find(p => p.name == 'Сапоги скорости')) {
                    extraMove = true;
                }
            }

            if (it.data().items) {
                if (it.data().items.find(p => p.name == 'Обездвижены!')) {
                    restrained = true;
                }
            }
            updateDoc(doc(db, "players", it.id), { movePoints: restrained ? 0 : extraMove ? 3 : 2, status: "navigate" });
            
        });


    }
    setRoundStart()



}



export function setupQuestions() {


    const setup = async () => {

        const q = query(collection(db, "players"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((it) => {

            const id = Math.floor(Math.random() * 2);
            updateDoc(doc(db, "players", it.id.toString()),
                { status: "dialog", questionId: id.toString(), lastAnswer: "", choiceIsMade: false, task: "" });
           /* const id = Math.floor(Math.random() * 370) + 1
            const id2 = Math.floor(Math.random() * 101)

            const rand = Math.floor(Math.random() * 101)
            if (rand > 85) {
                updateDoc(doc(db, "players", it.id.toString()),
                    { status: "task", taskId: id2.toString(), task: RoomTasks[id2].content, lastAnswer: "", choiceIsMade: false });
            } else {
                updateDoc(doc(db, "players", it.id.toString()),
                    { status: "dialog", questionId: id.toString(), lastAnswer: "", choiceIsMade: false, task: "" });
            }*/
            
            
        });


    }
    setup()



}