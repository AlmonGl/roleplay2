import './ChooseQuestionBlock.css';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useEffect, useState } from "react";
import { QuestionsTopicCount, QuestionsTotal } from "../data/Questions.js"
import { setupQuestions } from '../functions/handleQuestions.js';

import { soloMonsters } from "../data/MonsterList.js"
import { handleSetMonster } from '../functions/handleSoloMonster.js';

function ChooseQuestionBlock({ admin }) {

    const [sameQuestions, setIsSameQuestions] = useState(false);
    const [topic, setTopic] = useState('');
    const [qid, setQid] = useState('');

    const [selectedMonster, setSelectedMonster] = useState('-1');
    const handleChangeMonster = (e) => {
        setSelectedMonster(e.target.value);

    };

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
                onChange={(e) => setTopic(e.target.value)}
            >
                <option value="">topics</option>
                {QuestionsTopicCount.map(y => (
                    <option key={y.id} value={`${y.section} ${y.topic}`}>{y.section} {y.topic} ids: {y.ids} </option>
                ))}
            </select>
            <button
                onClick={() => {

                    if (!qid) {
                        setupQuestions(topic, -1, sameQuestions);
                    } else
                        if (qid >= 0 && qid <= QuestionsTotal) {
                            setupQuestions(topic, qid, sameQuestions);
                        } else {
                            setupQuestions(topic, -1, sameQuestions);
                        }

                    console.log(topic, qid);
                }}
                className="btn">
                {sameQuestions ? (qid ? `вопрос ${qid}` : topic ? `один случайный из ${topic}` : 'один случайный каждому') :
                    (qid ? `вопрос ${qid}` : topic ? `разные случайные из  ${topic}` : 'разный случайный каждому')}
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

                            <option key={`${m.id}`} value={m.id}>{m.id, m.name}</option>
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