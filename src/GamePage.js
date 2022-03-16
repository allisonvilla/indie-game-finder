import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const GamePage = (props) => {
    // Stateful variable to hold the game details returned by the API
    const [gameDetails, setGameDetails] = useState({});

    // Make an API call for the game details
    useEffect(() => {
        const apiKey = `92bb52f637714b219136e934ac1b2969`;
        // will use useParams for this
        const gameId = props.currentGame.id;

        axios.get(
            `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`
        )
        .then((results) => {
            setGameDetails(results.data);
        });
    }, []);

    console.log(props.currentGame);

    // Destructure the gameDetails object
    const { name, stores, released, background_image, description_raw } = gameDetails;

    console.log(stores);

    return (
        <section className="game-page">
            <div className="wrapper">
                <div className="main-info">
                    <div className="text-container">
                        <h2>{name}</h2>
                        <p className="release-date">
                            <span>Release Date:</span> {released}
                        </p>
                        <p>{description_raw}</p>
                    </div>
                    <div className="img-container">
                        <img
                            src={background_image}
                            alt={`Game art for ${name}`}
                        />
                    </div>
                </div>
                <div className="store-container">
                    <p>Available at:</p>
                    <ul className="stores">
                        {stores.map((storeObject) => {
                            return <li key={storeObject.store.id}>{storeObject.store.name}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default GamePage;