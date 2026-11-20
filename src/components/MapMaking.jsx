import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";


function MapMaking() {



    const handleAddMap = async () => {

        const map2 = [];
        for (let i = 0; i < 6; i++) {
            const row = [];
            for (let j = 0; j < 6; j++) {
                row.push({
                    
                    type: 'empty',
                    treasure: -1,
                    exit: false,
                    monster: -1,
                    player: null,
                    players: []

                });
            }


            map2.push(row);

        }
        let i = Math.floor(Math.random() * 6);
        let j = Math.floor(Math.random() * 6);
        map2[i][j].exit = true;


        let isSet = Math.floor(Math.random() * 4) + 2;
        while (isSet != 0) {
            i = Math.floor(Math.random() * 6);  
            j = Math.floor(Math.random() * 6)
            if (!map2[i][j].exit && map2[i][j].monster == -1) {
                map2[i][j].monster = Math.floor(Math.random() * 20);
                isSet = isSet - 1;
            }
        }

        isSet = Math.floor(Math.random() * 4) + 2;
        while (isSet != 0) {
            i = Math.floor(Math.random() * 6);
            j = Math.floor(Math.random() * 6)
            if (!map2[i][j].exit && map2[i][j].monster == -1 && map2[i][j].treasure == -1) {
                map2[i][j].treasure = Math.floor(Math.random() * 14);
                isSet = isSet - 1;
            }
        }
        setDoc(doc(db, "maps", "1"), { ...map2 });
        console.log(map2)
    }


    return (
        <>
            <button onClick={() => {

                handleAddMap()
            }
            }
                className="btn">
                Add/Change Map
            </button>


        </>
    )

}
 
export default MapMaking