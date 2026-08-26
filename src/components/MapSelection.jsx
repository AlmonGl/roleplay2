import { doc, updateDoc, query, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useState, useEffect } from 'react';

function MapSelection() {

    const [selectedMap, setSelectedMap] = useState('0');
    const [maps, setMaps] = useState('');

    useEffect(() => {
        const fetchData = async () => {
                       

            const q2 = query(collection(db, "maps"));
            const querySnapshot2 = await getDocs(q2);
            let mapsList = [];
            querySnapshot2.forEach((it) => {
                mapsList.push({ id: it.id })
                console.log(it.id);
            });
            setMaps(mapsList);
        }
        fetchData();

    }, []);


    const handleChangeMap = (e) => {
        setSelectedMap(e.target.value);

    };

    const handleSetMap = async () => {

        if (selectedMap != "0") {
            updateDoc(doc(db, "players", "S2y1gyVwUbpJa4jf9v8y"), { activeMap: selectedMap.toString() });
            const mapSnap2 = await getDoc(doc(db, "maps", selectedMap.toString()));
            const mapData = mapSnap2.data();

            const q = query(collection(db, "players"));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((it) => {
                if (it.currentMap != "-1") { 
                let set = false;
                let i ;
                let j ;
                    while (!set) {
                        i = Math.floor(Math.random() * 6);
                        j = Math.floor(Math.random() * 6);

                        if (mapData[i][j].monster == -1 && !mapData[i][j].exit && mapData[i][j].treasure == -1 ) {
                            set = true;
                            updateDoc(doc(db, "players", it.id), { row: i, col: j, currentMap: selectedMap.toString(), status: "navigate" });
                        }
                    }
                }

            });

            



        }


    }

    return (
        <>
            {maps ? 
                <div>
                    <select className="select-actions2" value={selectedMap} onChange={handleChangeMap}>
                        <option value="0">Maps</option>
                        {
                            maps.map(m =>

                                <option key={`${m.id}`} value={m.id}>{m.id}</option>
                            )
                        }

                    </select>
                    <p>Выбор: {(selectedMap) || 'no'}</p>
                    <button onClick={handleSetMap}


                        className="btn">
                        Load
                    </button> 


                </div>
            
            
            :
            <p>Loading....</p>
            }


        </>

    )
}

export default MapSelection