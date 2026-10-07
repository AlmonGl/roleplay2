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

    console.log("count ", count)

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
                status: "dialog", questionId: (Math.floor(Math.random() * 100)+414).toString(), rightLastAnswer: 0,
                lastAnswer: "", choiceIsMade: false, task: "", currentActionBonus: -1
            });
        setCount(count + 1);
        // здесь ваша логика в родительском компоненте
        
    };
    const handleConfirmNextQuestion = () => {
        
        const right = player.rightLastAnswer == 5 ? 1 : 0 
        
        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "dialog", questionId: (Math.floor(Math.random() * 100) + 414).toString() , rightLastAnswer: 0, lastAnswer: "",
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
                status: "idle",
                score: player.score + right
            });
        
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                score: demo.score + 2,
                stage: 2,
                activeGlobalPageWorldMap: true,
                worldMapId: 0
            });
        setCount(0);

        


    };
    const handleConfirmStartMap = () => {

        setCount(1);
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                activeGlobalPageMessage: true,
                message: "таймер 5",
                worldMapId: 0

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
            setCount(2);


        }, 5000);


    };
    const handleConfirmEndFirstMap = () => {

        updateDoc(doc(db, "players", demo.id.toString()),
            {
                
                
                worldMapId: 2
            });
        setTimeout(() => {
            setCount(3);


        }, 1000);
        
       
    };
    const handleConfirmStartSecondMap = () => {

        
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                activeGlobalPageMessage: true,
                message: "таймер 5",
                
            });
        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "navigateWorld",
                x: 32,
                y: 37,

            });
        setCount(4);
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
            setCount(5);
        }, 5000);


    };
    const handleConfirmEndMaps = () => {

        setCount(0);
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                stage: 3,
                score: demo.score + 2,
                
                activeGlobalPageWorldMap: false,
                activeGlobalPageImageView: true,
                imageViewId: 6,
            });

    };
    const handleConfirmImage = () => {

        setCount(1);
        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "dialog", questionId: "0", rightLastAnswer: 0, lastAnswer: "",
                choiceIsMade: false, task: "", currentActionBonus: -1
            });

    };
    const handleConfirmImageDate = () => {
        setCount(2);
        const right = player.rightLastAnswer == 5 ? 1 : 0

        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "idle",
                score: player.score + right
            });

        updateDoc(doc(db, "players", demo.id.toString()),
            {
                score: demo.score + 1,
                imageViewId: 9,
            });
        

    };

    const handleConfirmImageDiagram = () => {
        setCount(3);
        updateDoc(doc(db, "players", player.id.toString()),
            {
                status: "enterAnswer",
                lastEnterAnswer: 0
                
            });
        setTimeout(() => {
            updateDoc(doc(db, "players", demo.id.toString()),
                {
                    showRightAnswer: false,

                    activeEnterChoiceDiagram: true,
                    activeGlobalPageImageView: false,
                    lastEnterAnswer: Math.floor(Math.random() * 25) + 1850,
                    rightAnswer: "1860"
                });
        }, 5000);
        

    };
    const handleConfirmImageDiagramShowAnswer = () => {
        setCount(4);
        
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                
                showRightAnswer: true
            });

    };
    const handleConfirmEndDiagram = () => {
        setCount(0);
        if (Math.abs(player.lastEnterAnswer - 1860) >= Math.abs(demo.lastEnterAnswer - 1860)) {
            updateDoc(doc(db, "players", demo.id.toString()),
                {
                    score: demo.score + 1,
                });
        } else {
            updateDoc(doc(db, "players", player.id.toString()),
                {
                    score: player.score + 1,
                });
        }
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                stage: 4,
                showRightAnswer: false,
                activeEnterChoiceDiagram: false,

            });
        

    };
    

    const handleConfirmEnd = () => {
        updateDoc(doc(db, "players", demo.id.toString()),
            {
                stage: 0,
                activeGlobalPageWorldMap: false,
                activeGlobalPageRating: false,
                activeEnterChoiceDiagram: false,
                activeGlobalPageImageView: false,

            });
        dispatch(logOut());
    }

    console.log(count);
    
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
                                key={1}
                                message="Добрый день! Это демонстрация возможностей интерактивной платформы по геймификации образовательных процессов! Хотите узнать больше?"
                                buttonText="Поехали!"
                                onButtonClick={handleConfirmStart}
                            />
                            :
                        (demo.stage == 1 && count == 0 && player.status == "idle") ?
                            <MessageBox
                            key={2}
                            message="Начнем с нескольких вопросов против нашего лучшего ученика. Не забудьте открыть сайт со смартфона с логина testSmart. После этого перейдите на вкладку события(events), где появятся вопросы."
                            buttonText="Принять вызов"
                            onButtonClick={handleConfirmStartQuestions}
                        />
                        :
                        (demo.stage == 1 && count <= 3 && player.status == "idle") ?
                            <MessageBox
                                key={3}
                                message={player.rightLastAnswer == 5 ?
                                    "Правильно! Следующий вопрос! Не сворачивайте приложение на смартфоне, иначе мы поймем, что вы жульничаете!"
                                    :
                                    "Не совсем.. Следующий вопрос!"}
                                buttonText="Готовы!"
                                onButtonClick={handleConfirmNextQuestion}
                            />
                        :
                        (demo.stage == 1 && count >= 4 && player.status == "idle") ?
                        <MessageBox
                                key={4}
                                message={player.rightLastAnswer == 5 ?
                                    "Верно! Это был последний вопрос. Ваш соперник получил дополнительный балл за хорошее поведение! Перейдем к следующему испытанию!"
                                    :
                                    "Близко, но нет.. Это был последний вопрос. Ваш соперник получил дополнительный балл за хорошее поведение! Перейдем к следующему испытанию!"
                                }
                                buttonText="Да!"
                                onButtonClick={handleConfirmLastQuestion}
                                            />
                        :
                        (demo.stage == 2 && count == 0) ?
                        <MessageBox
                            key={5}
                            message="Используйте кнопки на экране телефона для перемещения. Ваше задание найти на карте родину Адама Смита за 20 секунд. Вперед!"
                            buttonText="Да!"
                            onButtonClick={handleConfirmStartMap}
                        />
                        :
                        (demo.stage == 2 && count == 2) ?
                        <MessageBox
                            key = {6}
                            message="Время вышло. Он родился в Шотландии, отлично!"
                            buttonText="Да!"
                            onButtonClick={handleConfirmEndFirstMap}
                        />
                        :
                        (demo.stage == 2 && count == 3) ?
                                                        <MessageBox
                                                            key={7}
                                message="Следующее задание: Проплывите как Ричард Львиное Сердце, который отправился в Крестовый поход!"
                                buttonText="Отчаливаем.."
                                onButtonClick={handleConfirmStartSecondMap}
                            />
                        :
                        (demo.stage == 2 && count == 5) ?
                                                            <MessageBox
                                                                key={8}
                                message="Неплохо, но вы не вписались в Гибралтарский пролив. Перейдем к следующему заданию."
                                buttonText="Ту-ту.."
                                onButtonClick={handleConfirmEndMaps}
                            />
                            :
                            (demo.stage == 3 && count == 0) ?
                                 <MessageBox
                                key={9}
                                message="Проверим вашу визуальную память! Кто это?"
                                buttonText="Посмотрим варианты..."
                                onButtonClick={handleConfirmImage}
                            />
                        :
                            (demo.stage == 3 && count == 1 && player.status == "idle") ?
                                 <MessageBox
                                key={10}
                                message={player.rightLastAnswer == 5 ? "Ничего себе!! Правильно! Ловите балл!" : "Ничего себе.. К сожалению, нет." }
                                buttonText="Дальше."
                                onButtonClick={handleConfirmImageDate}
                            />
                        :     
                        (demo.stage == 3 && count == 2) ?
                                 <MessageBox
                                key={11}
                                message="Посмотрите на изображение и предположите, в каком году оно создано. Поле для ввода появиться на телефоне."
                                buttonText="Считаем..."
                                onButtonClick={handleConfirmImageDiagram}
                            />
                        :    
                        (demo.stage == 3 && count == 3 && player.status == "idle") ?
                            <MessageBox
                                key={12}
                                message="Посмотрим на правильный ответ"
                                buttonText="Считаем..."
                                onButtonClick={handleConfirmImageDiagramShowAnswer}
                            />
                        :  
                        (demo.stage == 3 && count == 4 ) ?
                            <MessageBox
                                key={13}
                                message={Math.abs(player.lastEnterAnswer - 1860) >= Math.abs(demo.lastEnterAnswer - 1860) ? "Кажется, наш лучший студент немного ближе!" : "Вы были ближе!"}
                                buttonText="Дальше..."
                                onButtonClick={handleConfirmEndDiagram}
                            />
                            :  
                        (demo.stage == 4) ?
                        <MessageBox
                            key={14}
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
                                    <EnterChoiceDiagram players={[player, demo]} admin={demo} />
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


