import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";

export function handleSetWorldMap(players, mapId, adminId) {

    players.forEach((it) => {
        updateDoc(doc(db, "players", it.id), { x: Math.floor(Math.random() * 100) + 1, y: Math.floor(Math.random() * 100) + 1, status: "navigateWorld"  });

    })

    updateDoc(doc(db, "players", adminId), { worldMapId: mapId });
    

}

