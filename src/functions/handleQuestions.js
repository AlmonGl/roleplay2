import { doc, updateDoc, query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { RoomTasks } from "../data/RoomTasks.js"
import { QuestionsTotal, QuestionsTopicCount } from "../data/Questions.js"


export function setupQuestions(questionTopicAndSection, questionId, same) {
    const random = questionId == -1 ? true : false;
    const topic = questionTopicAndSection == "" ? false : true;
    let id = questionId == -1 ? Math.floor(Math.random() * QuestionsTotal) : questionId;
    let topicIds = [];
    let topicQuestionId = 0;
    if (random && questionTopicAndSection != '') {
        topicIds = QuestionsTopicCount.find(item => `${item.section} ${item.topic}` == questionTopicAndSection).ids;
        topicQuestionId = topicIds[Math.floor(Math.random() * topicIds.length)]
    }
    
    const setup = async () => {

        const q = query(collection(db, "players"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((it) => {



            if (!random) {
                updateDoc(doc(db, "players", it.id.toString()),
                    { status: "dialog", questionId: id.toString(), rightLastAnswer: 0, lastAnswer: "", choiceIsMade: false, task: "" });

            } else {
                if (!topic) {

                    updateDoc(doc(db, "players", it.id.toString()),
                        { status: "dialog", questionId: id.toString(), rightLastAnswer: 0, lastAnswer: "", choiceIsMade: false, task: "" });
                    if (!same) {
                        id = Math.floor(Math.random() * QuestionsTotal);
                    }

                    // if topic
                } else {
                    updateDoc(doc(db, "players", it.id.toString()),
                        { status: "dialog", questionId: topicQuestionId.toString(), rightLastAnswer: 0, lastAnswer: "", choiceIsMade: false, task: "" });

                    if (!same) {
                        topicQuestionId = topicIds[Math.floor(Math.random() * topicIds.length)];
                    } 
                   
                }
            }


            /*const rand = Math.floor(Math.random() * 101)
            if (rand > 85) {
                updateDoc(doc(db, "players", it.id.toString()),
                    { status: "task", taskId: id2.toString(), task: RoomTasks[id2].content, lastAnswer: "", choiceIsMade: false });
            } else {
                updateDoc(doc(db, "players", it.id.toString()),
                    { status: "dialog", questionId: id.toString(), lastAnswer: "", choiceIsMade: false, task: "" });
            }*/


        });


    }
    setup()

}



/**
 * Получить случайный неиспользованный вопрос по теме
 */
export const getRandomUnusedQuestion = async (topic) => {
    const questionsRef = collection(db, "questions");
    const randomThreshold = Math.random();

    // Основной запрос: неиспользованный + нужная тема + случайное число
    let q = query(
        questionsRef,
        where("topic", "==", topic),
        where("notUsed", "==", true),
        where("random", ">=", randomThreshold),
        orderBy("random", "asc"),
        limit(1)
    );

    let snapshot = await getDocs(q);

    // Если ничего не найдено, ищем в обратную сторону
    if (snapshot.empty) {
        q = query(
            questionsRef,
            where("topic", "==", topic),
            where("notUsed", "==", true),
            where("random", "<", randomThreshold),
            orderBy("random", "desc"),
            limit(1)
        );
        snapshot = await getDocs(q);
    }

    // Если всё равно пусто — все вопросы по этой теме использованы
    if (snapshot.empty) {
        return null;
    }

    const docSnapshot = snapshot.docs[0];
    const questionData = { id: docSnapshot.id, ...docSnapshot.data() };

    return questionData;
};

/**
 * Отметить вопрос как использованный
 */
export const markQuestionAsUsed = async (questionId) => {
    try {
        const questionRef = doc(db, "questions", questionId);
        await updateDoc(questionRef, {
            notUsed: false
        });
        console.log(`Вопрос ${questionId} отмечен как использованный`);
        return true;
    } catch (error) {
        console.error("Ошибка при обновлении вопроса:", error);
        return false;
    }
};

/**
 * Сбросить все вопросы (для новой сессии)
 */
export const resetAllQuestions = async () => {
    try {
        const questionsRef = collection(db, "questions");
        const snapshot = await getDocs(questionsRef);

        const batch = writeBatch(db);
        snapshot.docs.forEach((doc) => {
            const docRef = doc.ref;
            batch.update(docRef, { notUsed: true });
        });

        await batch.commit();
        console.log("Все вопросы сброшены");
        return true;
    } catch (error) {
        console.error("Ошибка при сбросе вопросов:", error);
        return false;
    }
};

/**
 * Получить количество неиспользованных вопросов по теме
 */
export const getUnusedQuestionsCount = async (topic) => {
    try {
        const questionsRef = collection(db, "questions");
        const q = query(
            questionsRef,
            where("topic", "==", topic),
            where("notUsed", "==", true)
        );

        const snapshot = await getDocs(q);
        return snapshot.size;
    } catch (error) {
        console.error("Ошибка при подсчёте:", error);
        return 0;
    }
};