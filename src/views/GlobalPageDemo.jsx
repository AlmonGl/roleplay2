import FantasyMap from "../components/FantasyMap.jsx"
import Header from '../components/Header.jsx';
import Rating from '../components/Rating.jsx';
import MonsterDisplay from '../components/MonsterDisplay.jsx';
import WorldMap from '../components/WorldMap.jsx';
import Notification from '../components/Notification.jsx';
import MessageBox from '../components/MessageBox.jsx';

import { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";

import { selectCurrentUserId } from '../store/usersSlice.js';
import './GlobalPage.css';

import EnterChoiceDiagram from "./EnterChoiceDiagram.jsx";
import ImageView from "./ImageView.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { logOut} from '../store/usersSlice.js';
function GlobalPage() {
    const pageTitle = "Let's see what is going on.";
    const [demo, setDemo] = useState([]);
    const [player, setPlayer] = useState([]);
    const currentUserId = useSelector(selectCurrentUserId);
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [load, setLoad] = useState(true);

    useEffect(() => {

        onSnapshot(doc(db, "players", currentUserId), (docSnap1) => {
            setDemo({ ...docSnap1.data(), id: docSnap1.id });
        });

    }, []);

    useEffect(() => {
        onSnapshot(doc(db, "players", "iazs4iq1yx"), (docSnap1) => {
            setPlayer({ ...docSnap1.data(), id: docSnap1.id });
        });
    }, []);    


    function handleConfirmLoad() {
        setLoad(false);
    }
    function handleConfirmStart() {
        setLoad(false);
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                stage: 1,
                activeGlobalPageRating: true,
                score: 0
            });
        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "idle",
                score: 0
            });
    }
    
    const handleConfirmStartQuestions = () => {
        
        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "dialog", questionId: "450", rightLastAnswer: 0,
                lastAnswer: "", choiceIsMade: false, task: "", currentActionBonus: -1
            });
        setCount(count + 1);
        // здесь ваша логика в родительском компоненте
        
    };
    const handleConfirmNextQuestion = () => {
        
        const right = player.rightLastAnswer == 5 ? 1 : 0 
        
        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "dialog", questionId: "450", rightLastAnswer: 0, lastAnswer: "",
                choiceIsMade: false, task: "", currentActionBonus: -1, score: player.score + right
            });
        
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                score: demo.score + 1
            });
        setCount(count + 1);
        // здесь ваша логика в родительском компоненте

    };
    const handleConfirmLastQuestion = () => {
        const right = player.rightLastAnswer == 5 ? 1 : 0
        
        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "dialog", questionId: "450", rightLastAnswer: 0, lastAnswer: "",
                choiceIsMade: false, task: "", currentActionBonus: -1, score: player.score + right
            });
        
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                score: demo.score + 2,
                stage: 2,
                activeGlobalPageWorldMap: true,
                worldMapId: 0
            });
        setCount(5);

        


    };
    const handleConfirmStartMap = () => {

        setCount(6);
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                activeGlobalPageMessage: true,
                message: "таймер 20"

            });
        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "navigateWorld",
                x: Math.floor(Math.random() * 100) + 1,
                y: Math.floor(Math.random() * 100) + 1,
               
            });
        setTimeout(() => {
            console.log("time is out");
            updateDoc(doc(db, "players", player.id.toString()),
                {
                    status: "idle"
                });

            updateDoc(doc(db, "players", demo.id.toString()),
                {
                    activeGlobalPageMessage: false, 
                });
            setCount(7);


        }, 20000);


    };
    const handleConfirmEndFirstMap = () => {

        updateDoc(doc(db, "players", demo.id.toString()),
            {
                activeGlobalPageMessage: true,
                message: "таймер 20",
                worldMapId: 2
            });
        setCount(8);
       
    };
    const handleConfirmStartSecondMap = () => {

        setCount(9);
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                
                worldMapId: 2
            });
        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "navigateWorld",
                x: Math.floor(Math.random() * 100) + 1,
                y: Math.floor(Math.random() * 100) + 1,

            });
        setTimeout(() => {
            console.log("time is out");
            updateDoc(doc(db, "players", player.id.toString()),
                {
                    status: "idle"
                });
            updateDoc(doc(db, "players", demo.id.toString()),
                {
                    activeGlobalPageMessage: false,
                });
            setCount(10);
        }, 20000);


    };
    const handleConfirmEndMaps = () => {

        setCount(10);
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                stage: 3

            });



    };

    

    const handleConfirmEnd = () => {
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                stage: 0,
                activeGlobalPageWorldMap: false,
                activeGlobalPageRating: false

            });
        dispatch(logOut());
    }

    
    
	return (
		<>

            {
                (load && demo.stage!= 0) ?
                    <MessageBox
                        message="Продолжим с сохранения!"
                        buttonText="Вперед!"
                        onButtonClick={handleConfirmLoad}
                    />
                    :

                    <div>

                        {
                        (demo.stage == 0) ?
                            <MessageBox
                                message="Добрый день! Это демонстрация возможностей интерактивной платформы по геймификации образовательных процессов! Хотите узнать больше?"
                                buttonText="Второй кнопки всё равно нет, поехали!"
                                onButtonClick={handleConfirmStart}
                            />
                            :
                        (demo.stage == 1 && count == 0 && player.status == "idle") ?
                        <MessageBox
                            message="Начнем с нескольких вопросов против нашего лучшего ученика. Не забудьте открыть сайт со смартфона с логина testSmart. После этого перейдите на вкладку события(events), где появятся вопросы."
                            buttonText="Принять вызов"
                            onButtonClick={handleConfirmStartQuestions}
                        />
                        :
                        (demo.stage == 1 && count <= 3 && player.status == "idle") ?
                            <MessageBox
                                message="Следующий вопрос!"
                                buttonText="Готовы!"
                                onButtonClick={handleConfirmNextQuestion}
                            />
                        :
                        (demo.stage == 1 && count >= 4 && player.status == "idle") ?
                            <MessageBox
                                message="Это был последний вопрос. Ваш соперник получил дополнительный балл за хорошее поведение! Перейдем к следующему испытанию!"
                                buttonText="Да!"
                                onButtonClick={handleConfirmLastQuestion}
                                            />
                        :
                        (demo.stage == 2 && count == 5) ?
                        <MessageBox
                            message="Используйте кнопки на экране телефона для перемещения. Ваше задание найти на карте родину Адама Смита за 20 секунд. Вперед!"
                            buttonText="Да!"
                            onButtonClick={handleConfirmStartMap}
                        />
                        :
                        (demo.stage == 2 && count == 7) ?
                        <MessageBox
                            message="Время вышло. Он родился в Шотландии, отлично!"
                            buttonText="Да!"
                            onButtonClick={handleConfirmEndFirstMap}
                        />
                        :
                        (demo.stage == 2 && count == 8) ?
                            <MessageBox
                                message="Следующее задание: Проплывите как Ричард Львиное Серце, который отправился в Крестовый поход!"
                                buttonText="Отчаливаем.."
                                onButtonClick={handleConfirmStartSecondMap}
                            />
                        :
                        (demo.stage == 2 && count == 10) ?
                            <MessageBox
                                message="Неплохо, но вы не вписались в Гибралтарский пролив."
                                buttonText="Ту-ту.."
                                onButtonClick={handleConfirmEndMaps}
                            />
                            :
                        (demo.stage == 3) ?
                        <MessageBox
                                message="На этом всё, спасибо!"
                                buttonText="Ок"
                                onButtonClick={handleConfirmEnd}
                            />
                        :
                        <></>
                        }

                        {!demo.id || !player ? <p>Loading... </p>
                            :

                            <div className="global-container">


                                {demo.activeGlobalPageMap &&
                                    <FantasyMap
                                        players={[player]}
                                        activeMap={demo.activeMap}
                                        showTooltips={true}
                                        gridSize={6}
                                        emptyCellSymbol="🌿"

                                    />
                                }
                                {demo.activeGlobalPageMonster &&
                                    <MonsterDisplay id={demo.currentMonster} health={demo.currentMonsterHP} symbols={demo.symbols} players={[player]} />
                                }
                                {demo.activeGlobalPageWorldMap &&
                                    <WorldMap admin={demo} players={[player]} />
                                }
                                {demo.activeEnterChoiceDiagram &&
                                    <EnterChoiceDiagram players={[player]} admin={demo} />
                                }
                                {demo.activeGlobalPageImageView &&
                                    <ImageView admin={demo} />
                                }
                                {demo.activeGlobalPageMessage &&
                                    <Notification admin={demo} />
                                }
                                {demo.activeGlobalPageRating &&
                                    <Rating players={[demo, player]} />
                                }





                            </div>

                        }

                    </div>
            }
		</>
	)
}


export default GlobalPage


