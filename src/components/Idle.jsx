
import { IdleMessages } from '../data/IdleMessages.js';
import { TaskPhrases } from '../data/TaskPhrases.js';

function Idle() {
           

    return (
        <>
            

                <div><h3>Дело сделано, ждите других игроков.</h3>
                    <h3>{TaskPhrases[Math.floor(Math.random() * 50)].data}</h3>
                    <h3>{IdleMessages[Math.floor(Math.random() * 100)].text}</h3>
                </div>
            
        </>
    )

}

export default Idle