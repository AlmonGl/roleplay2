import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";

export function handleSetWorldMap(players) {

    players.forEach((it) => {
        updateDoc(doc(db, "players", it.id), { x: Math.floor(Math.random() * 100) + 1, y: Math.floor(Math.random() * 100) + 1, status: "navigateWorld"  });

    })

    

}

