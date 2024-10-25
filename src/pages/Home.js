import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hearts from '../components/Hearts';

function Home() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();

    const handleStartGame = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            navigate('/quiz');
            setIsTransitioning(false);
        }, 2000); // Tempo per l'animazione (2 secondi)
    };

    return (
        <div className="relative bg-blue-50 min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Cuori animati */}
            <Hearts />

            {/* Contenuto della pagina */}
            <div className={`text-center relative z-10 transition-all duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {/* Aggiungiamo l'animazione bounceIn */}
                <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-bounceIn">
                    Buon Compleanno, Amore! 🎉
                </h1>

                {/* Box contenente l'introduzione e il bottone */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-4">
                    <p className="text-xl text-gray-700 font-bold">
                        Pronta per scoprire il tuo regalo?
                    </p>
                    <p className="text-lg text-gray-500 mt-4">
                        Rispondi a questi indovinelli per scoprirlo!
                    </p>
                    <button
                        onClick={handleStartGame}
                        className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-400 transition ease-in-out duration-300"
                    >
                        Inizia il gioco!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
