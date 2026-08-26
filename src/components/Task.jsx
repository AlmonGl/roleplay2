import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { RoomTasks } from '../data/RoomTasks.js';

function Task({player }) {


    return (
        <>


            <div><h3>Вам повезло, вместо вопроса вы получили настоящее (в отличии от других заданий, это принесет вам ОЧКИ)!</h3>
            <br></br>
                <h3>{RoomTasks[player.taskId].content}</h3>
                <br></br>
            </div>
            <button
                className="btn"
                onClick={() => { updateDoc(doc(db, "players", player.id), { status: 'idle' }) }}

            >
                Задание принято!
            </button>
        </>
    )

}

export default Task


//<h3>{IdleMessages[Math.floor(Math.random() * 100)].text}</h3>