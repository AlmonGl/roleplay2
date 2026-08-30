/* EXAMPLES - fetch maps
       useEffect(() => {
       const fetchData = async () => {
           
           
                       

           const q2 = query(collection(db, "maps"));
           const querySnapshot2 = await getDocs(q2);
           let mapsList = [];
           querySnapshot2.forEach((it) => {
               mapsList.push({ id: it.id})
               
           });
           setMaps(mapsList);
       }
       fetchData();

       }, []);*/




import React, { useState, useEffect } from 'react';
import {
    getRandomUnusedQuestion,
    markQuestionAsUsed,
    resetAllQuestions,
    getUnusedQuestionsCount
} from './firebaseHelpers';

const QuizApp = () => {
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [topic, setTopic] = useState("история");
    const [remainingQuestions, setRemainingQuestions] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    // Проверяем количество оставшихся вопросов при загрузке и смене темы
    useEffect(() => {
        const checkRemaining = async () => {
            const count = await getUnusedQuestionsCount(topic);
            setRemainingQuestions(count);
            if (count === 0 && !loading) {
                setShowResult(true);
            }
        };
        checkRemaining();
    }, [topic]);

    // Получить следующий вопрос
    const fetchNextQuestion = async () => {
        setLoading(true);
        setShowResult(false);
        setSelectedAnswer(null);
        try {
            const questionData = await getRandomUnusedQuestion(topic);

            if (!questionData) {
                // Нет неиспользованных вопросов
                setQuestion(null);
                setShowResult(true);
                setRemainingQuestions(0);
                alert(`Все вопросы по теме "${topic}" использованы!`);
                return;
            }

            setQuestion(questionData);

            // Обновляем количество оставшихся вопросов
            const count = await getUnusedQuestionsCount(topic);
            setRemainingQuestions(count);

        } catch (error) {
            console.error("Ошибка при получении вопроса:", error);
        } finally {
            setLoading(false);
        }
    };

    // Обработка ответа пользователя
    const handleAnswer = async (selectedIndex) => {
        if (!question || selectedAnswer !== null) return;

        setSelectedAnswer(selectedIndex);
        const correct = selectedIndex === question.correctAnswer;
        setIsCorrect(correct);

        // Если ответ правильный - отмечаем вопрос как использованный
        if (correct) {
            await markQuestionAsUsed(question.id);

            // Обновляем счётчик оставшихся вопросов
            const count = await getUnusedQuestionsCount(topic);
            setRemainingQuestions(count);

            // Автоматически загружаем следующий вопрос через 2 секунды
            setTimeout(() => {
                if (count > 0) {
                    fetchNextQuestion();
                } else {
                    setShowResult(true);
                }
            }, 1500);
        } else {
            // Если ответ неправильный - можно дать подсказку или не отмечать вопрос
            // Здесь можно добавить логику: например, дать вторую попытку
        }
    };

    // Сбросить все вопросы и начать заново
    const handleReset = async () => {
        setLoading(true);
        await resetAllQuestions();
        const count = await getUnusedQuestionsCount(topic);
        setRemainingQuestions(count);
        setShowResult(false);
        setQuestion(null);
        setSelectedAnswer(null);
        await fetchNextQuestion();
        setLoading(false);
    };

    // Инициализация - загружаем первый вопрос при монтировании
    useEffect(() => {
        fetchNextQuestion();
    }, []);

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h1>🎯 Квиз</h1>
                <div className="topic-selector">
                    <select
                        value={topic}
                        onChange={(e) => {
                            setTopic(e.target.value);
                            setQuestion(null);
                            setShowResult(false);
                            setSelectedAnswer(null);
                            setTimeout(fetchNextQuestion, 100);
                        }}
                        disabled={loading}
                    >
                        <option value="история">📚 История</option>
                        <option value="география">🌍 География</option>
                        <option value="наука">🔬 Наука</option>
                        <option value="спорт">⚽ Спорт</option>
                    </select>
                    <span className="questions-remaining">
                        📌 Осталось: {remainingQuestions}
                    </span>
                </div>
            </div>

            {showResult ? (
                <div className="result-section">
                    <h2>🎉 Вы ответили на все вопросы!</h2>
                    <p>По теме "{topic}" больше нет неиспользованных вопросов.</p>
                    <button onClick={handleReset} className="reset-button">
                        🔄 Начать заново
                    </button>
                </div>
            ) : loading ? (
                <div className="loading">Загрузка вопроса...</div>
            ) : question ? (
                <div className="question-section">
                    <h2 className="question-text">{question.question}</h2>
                    <div className="options-grid">
                        {question.options.map((option, idx) => {
                            let className = "option-button";
                            if (selectedAnswer !== null) {
                                if (idx === question.correctAnswer) {
                                    className += " correct";
                                } else if (idx === selectedAnswer && !isCorrect) {
                                    className += " incorrect";
                                }
                                className += " disabled";
                            }
                            return (
                                <button
                                    key={idx}
                                    className={className}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {option}
                                    {selectedAnswer !== null && idx === question.correctAnswer && " ✅"}
                                    {selectedAnswer === idx && !isCorrect && " ❌"}
                                </button>
                            );
                        })}
                    </div>
                    {selectedAnswer !== null && (
                        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                            {isCorrect
                                ? "✅ Правильно! Отлично!"
                                : `❌ Неправильно. Правильный ответ: ${question.options[question.correctAnswer]}`}
                        </div>
                    )}
                </div>
            ) : (
                <div className="no-questions">
                    <p>Нет доступных вопросов</p>
                    <button onClick={handleReset}>Сбросить</button>
                </div>
            )}

            {!loading && !showResult && question && selectedAnswer === null && (
                <button
                    onClick={fetchNextQuestion}
                    className="skip-button"
                    title="Пропустить вопрос (он останется неиспользованным)"
                >
                    ⏭️ Пропустить
                </button>
            )}
        </div>
    );
};

export default QuizApp;