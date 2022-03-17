import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const GamePage = () => {
    // Stateful variables to hold the game details returned by the API
    const [gameDetails, setGameDetails] = useState({});
    const [stores, setStores] = useState([]);

    const { gameId } = useParams();

    // Make an API call for the game details
    useEffect(() => {
        const apiKey = `92bb52f637714b219136e934ac1b2969`;

        axios
            .get(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
            .then((results) => {
                setGameDetails(results.data);
                setStores(results.data.stores);
            });
    }, [gameId]);

    // Destructure the gameDetails object
    const { name, released, background_image, description, website } = gameDetails;

    return (
        <section className="game-page">
            <h3>{name}</h3>
            <p className="release-date">
                <span>Release Date:</span> {released}
            </p>
            <p className="website">
                <span>Website:</span>{' '}
                <a href={`${website}`} target="_blank" rel="noreferrer">
                    {website}
                </a>
            </p>
            <div className="main-info">
                <div className="img-container">
                    <img src={background_image} alt={`Game art for ${name}`} />
                </div>
                <div className="text-container">
                    <p
                        className="description"
                        // Is this...dangerous?
                        dangerouslySetInnerHTML={{ __html: description }}
                    ></p>
                </div>
            </div>
            <div className="store-container">
                <p>Available at:</p>
                <ul className="stores">
                    {stores.map((storeObject) => {
                        return (
                            <li key={storeObject.store.id}>
                                {storeObject.store.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="back-to-homepage">
                <span className="emoji">👉</span> <Link to="/">Back</Link>
            </div>
        </section>
    );
};

export default GamePage;
