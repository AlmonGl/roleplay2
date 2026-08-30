import { doc, updateDoc, query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { RoomTasks } from "../data/RoomTasks.js"
import { QuestionsTotal } from "../data/Questions.js"

export function setAllActiveIdle(players) {
    players.forEach((it) => {
        updateDoc(doc(db, "players", it.id), {  status: "idle" });

    })



}

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



