import {  doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useEffect, useState } from "react";

function AdminCheckBoxes({ currentUserId }) {

    const [isCheckedMap, setIsCheckedMap] = useState(false);
    const [isCheckedRating, setIsCheckedRating] = useState(false);
    const [isCheckedMonster, setIsCheckedMonster] = useState(false);
    const [isCheckedWorldMap, setIsCheckedWorldMap] = useState(false);
    const [isCheckedEnterChoiceDiagram, setIsCheckedEnterChoiceDiagram] = useState(false);
    const [isCheckedShowRightAnswer, setIsCheckedShowRightAnswer] = useState(false);

    const [rightNumber, setRightNumber] = useState(-1);
    

    useEffect(() => {
        

        const fetchData = async () => {
            const docSnap = await getDoc(doc(db, "players", currentUserId.toString()));

            setIsCheckedMap(docSnap.data().activeGlobalPageMap);

            setIsCheckedRating(docSnap.data().activeGlobalPageRating);
            setIsCheckedMonster(docSnap.data().activeGlobalPageMonster);
            setIsCheckedWorldMap(docSnap.data().activeGlobalPageWorldMap);
            setIsCheckedEnterChoiceDiagram(docSnap.data().activeEnterChoiceDiagram);
            setIsCheckedShowRightAnswer(docSnap.data().showRightAnswer);
        }
        fetchData();



    }, []);

    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: 'repeat(2, auto)',
            gridAutoFlow: 'column'
        }}>
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
            <div >
                <label htmlFor="myCheck" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Диаграмма
                </label>
                <input
                    id="myCheck"
                    type="checkbox"
                    checked={isCheckedEnterChoiceDiagram}
                    onChange={() => {

                        updateDoc(doc(db, "players", currentUserId), { activeEnterChoiceDiagram: !isCheckedEnterChoiceDiagram });
                        setIsCheckedEnterChoiceDiagram(!isCheckedEnterChoiceDiagram);

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
                    show answer
                </label>
                <input
                    id="myCheck"
                    type="checkbox"
                    checked={isCheckedShowRightAnswer}
                    onChange={() => {

                        updateDoc(doc(db, "players", currentUserId), { showRightAnswer: !isCheckedShowRightAnswer });
                        setIsCheckedShowRightAnswer(!isCheckedShowRightAnswer);

                    }}
                    style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer'
                    }}
                />
                <div className="admin-text-field-small">
                    <input

                    type="text"
                    placeholder="число"
                    value={rightNumber}

                    onChange={(e) => {
                        
                        setRightNumber(e.target.value);
                        
                    }}
                />
                </div>
                <button
                    onClick={() => {
                        if (rightNumber != -1) {
                            console.log(123);
                            updateDoc(doc(db, "players", currentUserId), { rightAnswer: rightNumber });

                        }
                    }}
                    className="btn">
                    set
                </button>
            </div>

          
            
    </div>

    )

}

export default AdminCheckBoxes