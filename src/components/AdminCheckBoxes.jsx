import {  doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useEffect, useState } from "react";

function AdminCheckBoxes({ currentUserId }) {

    const [isCheckedMap, setIsCheckedMap] = useState(false);
    const [isCheckedRating, setIsCheckedRating] = useState(false);
    const [isCheckedMonster, setIsCheckedMonster] = useState(false);
    const [isCheckedWorldMap, setIsCheckedWorldMap] = useState(false);

    useEffect(() => {
        

        const fetchData = async () => {
            const docSnap = await getDoc(doc(db, "players", currentUserId.toString()));

            setIsCheckedMap(docSnap.data().activeGlobalPageMap);

            setIsCheckedRating(docSnap.data().activeGlobalPageRating);
            setIsCheckedMonster(docSnap.data().activeGlobalPageMonster);
            setIsCheckedWorldMap(docSnap.data().activeGlobalPageWorldMap);
        }
        fetchData();



    }, []);

    return (
    <>
            <div >
                <label htmlFor="myCheck" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Карта
                </label>
                <input
                    id="myCheck"
                    type="checkbox"
                    checked={isCheckedMap}
                    onChange={() => {

                        updateDoc(doc(db, "players", currentUserId), { activeGlobalPageMap: !isCheckedMap });
                        setIsCheckedMap(!isCheckedMap);
                                    
                    }}
                    style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer'
                    }}
                />
            </div>
            <div >
                <label htmlFor="myCheck" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Рейтинг
                </label>
                <input
                    id="myCheck"
                    type="checkbox"
                    checked={isCheckedRating}
                    onChange={() => {

                        updateDoc(doc(db, "players", currentUserId), { activeGlobalPageRating: !isCheckedRating });
                        setIsCheckedRating(!isCheckedRating);
                                    
                    }}
                    style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer'
                    }}
                />
            </div>
            <div >
                <label htmlFor="myCheck" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Монстр
                </label>
                <input
                    id="myCheck"
                    type="checkbox"
                    checked={isCheckedMonster}
                    onChange={() => {

                        updateDoc(doc(db, "players", currentUserId), { activeGlobalPageMonster: !isCheckedMonster });
                        setIsCheckedMonster(!isCheckedMonster);

                    }}
                    style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer'
                    }}
                />
            </div>
            <div >
                <label htmlFor="myCheck" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Карта мира
                </label>
                <input
                    id="myCheck"
                    type="checkbox"
                    checked={isCheckedWorldMap}
                    onChange={() => {

                        updateDoc(doc(db, "players", currentUserId), { activeGlobalPageWorldMap: !isCheckedWorldMap });
                        setIsCheckedWorldMap(!isCheckedWorldMap);

                    }}
                    style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer'
                    }}
                />
            </div>
    </>

    )

}

export default AdminCheckBoxes