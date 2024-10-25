import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hearts from "../components/Hearts";
import avatarIcon from "../assets/progress_icon.png";
import "./QuizPage.css"; // Importa il file CSS per il font

const quizQuestions = [
    { question: "Qual è la capitale della Francia?", options: ["Roma", "Parigi", "Madrid", "Berlino"], answer: "Parigi" },
    { question: "Qual è la capitale della Francia?", options: ["Roma", "Parigi", "Madrid", "Berlino"], answer: "Parigi" },
    // Aggiungi altre domande qui...
];

const loveQuotes = [
    { quote: "Amor che move il sole e l'altre stelle.", author: "Dante Alighieri" },
    { quote: "E m’illumino d’immenso.", author: "Giuseppe Ungaretti" },
    { quote: "Io t'amo d'un amor che non sapevo, io t'amo col mio cuore e col mio sangue.", author: "Gabriele D'Annunzio" },
    { quote: "La vita senza amore è come un albero senza fiori o frutti.", author: "Khalil Gibran" },
    // Aggiungi altre frasi qui...
];

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [timer, setTimer] = useState(15);
    const [progress, setProgress] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); // Stato per gestire il caricamento
    const navigate = useNavigate();

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const currentQuote = loveQuotes[currentQuestionIndex]?.quote; // Uso dell'optional chaining
    const currentAuthor = loveQuotes[currentQuestionIndex]?.author; // Uso dell'optional chaining

    useEffect(() => {
        // Aggiunge un timeout per simulare il caricamento della pagina
        const timerId = setTimeout(() => {
            setIsLoaded(true); // Imposta isLoaded a true dopo un breve ritardo
        }, 500); // Modifica la durata del ritardo se necessario

        const countdown = setInterval(() => {
            if (timer > 0) setTimer((prev) => prev - 1);
            else handleTimeout();
        }, 1000);

        return () => {
            clearInterval(countdown);
            clearTimeout(timerId); // Pulisci il timer
        };
    }, [timer]);

    const handleAnswer = (selectedOption) => {
        setIsTransitioning(true);
        const isAnswerCorrect = selectedOption === currentQuestion.answer;
        setIsCorrect(isAnswerCorrect);

        setTimeout(() => {
            if (isAnswerCorrect) {
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setProgress(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
                } else {
                    navigate("/congratulations");
                }
            } else {
                if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                    setProgress(((currentQuestionIndex - 1) / quizQuestions.length) * 100);
                }
            }
            resetTimer();
            setIsTransitioning(false);
            setIsCorrect(null);
        }, 2000);
    };

    const handleTimeout = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setProgress(((currentQuestionIndex - 1) / quizQuestions.length) * 100);
        }
        resetTimer();
    };

    const resetTimer = () => {
        setTimer(15);
    };

    return (
        <div className={`relative bg-blue-50 min-h-screen flex flex-col items-center justify-center overflow-hidden p-5 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

            <Hearts />

            {/* Frase d'amore */}
            <div className={` py-3 mb-2 text-center max-w-md text-pink-600 heart-beat italic text-3xl font-semibold loveQuotes ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                "{currentQuote}"
            </div>
            <div className="text-center max-w-md text-gray-700 italic text-xl font-light loveQuotes pb-10">
                {currentAuthor}
            </div>


            {/* Barra di avanzamento */}
            <div className="relative w-full bg-gray-200 rounded-full h-4 mb-6 max-w-md shadow-lg">
                <div
                    style={{ width: `${progress}%` }}
                    className="h-4 rounded-full bg-pink-400 transition-all duration-500"
                ></div>
                <img
                    src={avatarIcon}
                    alt="Avatar Icon"
                    style={{ left: `calc(${progress}% - 16px)` }}
                    className="absolute top-[-10px] w-8 h-8 transition-all duration-500 rounded-full border-2 border-pink-300 shadow-md"
                />
            </div>

            {/* Timer */}
            <div className="text-center text-2xl font-extrabold text-pink-500 mb-2 animate-pulse">
                {timer}s
            </div>

            {/* Contenuto della domanda */}
            <div
                className={`text-center bg-white p-8 mx-5 rounded-lg shadow-2xl max-w-md w-full transition-all duration-1000 ${isTransitioning
                    ? isCorrect
                        ? "scale-105 bg-green-100"
                        : "scale-100 bg-red-100"
                    : "opacity-100 scale-100"
                    }`}
            >
                <h2 className="text-3xl font-semibold text-blue-700 mb-4">
                    {currentQuestion.question}
                </h2>
                <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            className="w-full bg-blue-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-300 transition-all duration-300 font-medium"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default Quiz;
