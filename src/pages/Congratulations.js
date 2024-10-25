// pages/Congratulations.js

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Congratulations = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 500); // Effetto fade-in dopo mezzo secondo
        setTimeout(() => setShowConfetti(false), 5000); // Stop confetti dopo 5 secondi
    }, []);

    return (
        <div
            className={`relative flex items-center justify-center min-h-screen bg-blue-50 overflow-hidden transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
        >
            {/* Effetto fuochi d’artificio con Confetti */}
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false} // Limita l'animazione
                    numberOfPieces={300}
                    colors={["#FF69B4", "#FFD700", "#00BFFF", "#FF4500"]}
                />
            )}

            {/* Contenuto congratulazioni */}
            <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
                <h1 className="text-4xl font-extrabold text-pink-600 mb-6 animate-bounce">
                    Complimenti! 🎉
                </h1>
                <p className="text-lg text-gray-700 mb-4">
                    Hai completato il quiz con successo! Sei pronta per scoprire il tuo regalo!
                </p>
                <a
                    href="../assets/sample.pdf" // Modifica il nome del file PDF
                    download="Regalo.pdf" // Nome del file che verrà scaricato
                    className="mt-6 bg-pink-500 text-white font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-pink-400 transition duration-300"
                >
                    Riscatta regalo
                </a>
            </div>
        </div>
    );
};

export default Congratulations;
