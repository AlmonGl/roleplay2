import { doc, updateDoc, query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { RoomTasks } from "../data/RoomTasks.js"
import { QuestionsTotal } from "../data/Questions.js"
import { soloMonsters } from "../data/MonsterList.js"
export function handleSetMonster(player, monsterId) {

   // console.log(soloMonsters[monsterId].maxHealth, player.id);
   updateDoc(doc(db, "players", player.id), { currentMonster: monsterId, currentMonsterHP: soloMonsters[monsterId].maxHealth });

}
