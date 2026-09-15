import './ChooseQuestionBlock.css';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useEffect, useState } from "react";
import { QuestionsTopicCount, QuestionsTotal } from "../data/Questions.js"
import { setupQuestions } from '../functions/handleQuestions.js';

import { soloMonsters } from "../data/MonsterList.js"
import { handleSetMonster } from '../functions/handleSoloMonster.js';

function ChooseQuestionBlock({ admin , players } ) {

    const [sameQuestions, setIsSameQuestions] = useState(false);
    const [section, setSection] = useState('');
    const [qid, setQid] = useState('');

    const [selectedMonster, setSelectedMonster] = useState('-1');
    const handleChangeMonster = (e) => {
        setSelectedMonster(e.target.value);

    };
    async function updateWithDelay() {
        // 1. Выполняем первое обновление и ждём его завершения
        await updateDoc(doc(db, "players", admin.id), {
            message: "таймер 30 Внимание вопрос!",
            activeGlobalPageMessage: true
        });

        // 2. Ждём 30 секунд (30000 мс)
        await new Promise(resolve => setTimeout(resolve, 30000));

        // 3. Выполняем второе обновление (замените поля на свои)
        await updateDoc(doc(db, "players", admin.id), {
            // Пример: сбрасываем флаг или меняем сообщение
            activeGlobalPageMessage: false,
            // или что-то другое
        });
    }
    return (
        
        
        <div className="admin-text-field">
            <div className="admin-text-field-small"><input

                type="text"
                placeholder="номер"
                value={qid}

                onChange={(e) => setQid(e.target.value)}
            />
            </div>
            <select
                className="select-actions2"
                placeholder="темы"
                onChange={(e) => setSection(e.target.value)}
            >
                <option value="">sections</option>
                {QuestionsTopicCount.map(y => (
                    <option key={y.id} value={y.section}>{y.section} ids: {y.idStart}-{y.idFinish}  </option>
                ))}
            </select>
            <button
                onClick={() => {

                    if (!qid) {
                        setupQuestions(players, section, -1, sameQuestions);
                        console.log(1, QuestionsTotal);
                    } else
                        if (qid >= 0 && qid <= QuestionsTotal) {
                            setupQuestions(players, section, qid, sameQuestions);
                            console.log(2, QuestionsTotal);
                        } else {
                            setupQuestions(players, section, -1, sameQuestions);
                            console.log(3, QuestionsTotal);
                        }
                    updateWithDelay();
                    
                }}
                className="btn">
                {sameQuestions ? (qid ? `вопрос ${qid}` : section ? `один случайный из ${section}` : 'один случайный каждому') :
                    (qid ? `вопрос ${qid}` : section ? `разные случайные из  ${section}` : 'разный случайный каждому')}
            </button>
            <div>
                <label htmlFor="myCheck" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Same
                </label>
                <input
                    id="myCheck"
                    type="checkbox"
                    checked={sameQuestions}
                    onChange={() => {


                        setIsSameQuestions(!sameQuestions);

                    }}
                    style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer'
                    }}
                />
            </div>
            
            <div>
                <select className="select-actions2" value={selectedMonster} onChange={handleChangeMonster}>
                    <option value="-1">Monsters</option>
                    {
                        soloMonsters.map(m =>

                            <option key={`${m.id}`} value={m.id}>{m.id}, {m.name}, {m.tip}</option>
                        )
                    }

                </select>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                        onClick={() => {
                            if (selectedMonster != -1) {
                                handleSetMonster(admin, selectedMonster);

                            }
                        }}
                        className="btn">
                        Назначить 
                    </button>
                    <button onClick={() => {
                        updateDoc(doc(db, "players", admin.id), { currentMonsterHP: admin.currentMonsterHP - 1 });
                    }
                    }
                        className="btn">
                            -HP
                    </button>
                    <button onClick={() => {
                        updateDoc(doc(db, "players", admin.id), { currentMonsterHP: admin.currentMonsterHP + 1 });
                    }
                    }
                        className="btn">
                        +HP
                    </button>
                </div>
            </div>

        </div>
    
    
    )
}

export default ChooseQuestionBlock