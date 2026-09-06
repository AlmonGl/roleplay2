
import { IdleMessages } from '../data/IdleMessages.js';
import { TalkPhrases } from '../data/TaskPhrases.js';

function Idle({player }) {
           

    return (
        <>

            
            <div>
                <h3>Дело сделано, ждите других игроков. {/*player.rightLastAnswer == 5 ? '😀' : player.rightLastAnswer == 2 ? '🙁' : ''*/}</h3>


                <h3>{TalkPhrases[Math.floor(Math.random() * TalkPhrases.length)].data}</h3>
                <h3>{IdleMessages[Math.floor(Math.random() * IdleMessages.length)].text}</h3>
                </div>
            
        </>
    )

}

export default Idle