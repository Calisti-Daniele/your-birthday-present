import React, { useEffect, useState } from 'react';
import heartImage from '../assets/heart.png'; // Assicurati che il percorso sia corretto

const Hearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const generateHeart = () => {
            setHearts((prevHearts) => [
                ...prevHearts,
                {
                    id: Math.random(),
                    left: Math.random() * 100, // Posizione orizzontale casuale
                    size: Math.random() * 30 + 20, // Dimensione casuale tra 20px e 50px
                },
            ]);
        };

        // Genera subito un cuore per far partire l'animazione immediatamente
        generateHeart();

        // Continua a generare nuovi cuori ogni 1 secondo
        const heartInterval = setInterval(generateHeart, 1000);

        // Rimuovi i cuori "volati via" per mantenere le performance
        const cleanUpInterval = setInterval(() => {
            setHearts((prevHearts) => prevHearts.slice(-50));
        }, 5000);

        // Pulisce gli intervalli quando il componente viene smontato
        return () => {
            clearInterval(heartInterval);
            clearInterval(cleanUpInterval);
        };
    }, []);

    return (
        <>
            {hearts.map((heart) => (
                <img
                    key={heart.id}
                    src={heartImage} // Usa l'immagine del cuore
                    alt="heart"
                    className="heart"
                    style={{
                        left: `${heart.left}%`,
                        width: `${heart.size}px`,
                        height: `${heart.size}px`,
                        animationDuration: `15s`, // Durata animazione variabile
                    }}
                />
            ))}
        </>
    );
};

export default Hearts;
