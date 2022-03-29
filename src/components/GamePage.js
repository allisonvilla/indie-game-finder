import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import firebase from '../firebaseConfig';
import { getDatabase, ref, set } from 'firebase/database';

const GamePage = () => {
    // Stateful variables to hold the game details returned by the API
    const [gameDetails, setGameDetails] = useState({});
    const [stores, setStores] = useState([]);

    // Stateful variables for user reviews
    const [nameInput, setNameInput] = useState('');
    const [reviewInput, setReviewInput] = useState('');

    // Stateful variable for form validation failure
    const [formFail, setFormFail] = useState(false);

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
    const { name, released, background_image, description, website } =
        gameDetails;

    const handleNameChange = (event) => {
        setNameInput(event.target.value);
    };

    const handleReviewChange = (event) => {
        setReviewInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check that the user has entered at least one character for their name and at least two characters for the review input
        if (nameInput.length < 1 || reviewInput.length < 2) {
            setFormFail(true);
        } else {
            // Create a reference to our database
            const database = getDatabase(firebase);
    
            set(ref(database, gameId + nameInput), {
                game: name,
                game_id: gameId,
                username: nameInput,
                review: reviewInput,
            });
            
            setNameInput('');
            setReviewInput('');
            setFormFail(false);
        }
    };

    return (
        <section className="game-page">
            <h3>{name}</h3>
            <p className="release-date">
                <span>Release Date:</span> {released}
            </p>
            {website ? (
                <p className="website">
                    <span>Website:</span>{' '}
                    <a href={`${website}`} target="_blank" rel="noreferrer">
                        {website}
                    </a>
                </p>
            ) : null}

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

            <div className="review-form">
                <p className="review-instructions">
                    Played {name}? Leave a review!
                </p>
                <form action="" name="review-form" id="review-form">
                    <label htmlFor="name" className="sr-only">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="My name"
                        onChange={handleNameChange}
                        value={nameInput}
                    />
                    <label htmlFor="review" className="sr-only">
                        Review Text
                    </label>
                    <input
                        type="textarea"
                        name="review"
                        id="review"
                        placeholder="This game was..."
                        onChange={handleReviewChange}
                        value={reviewInput}
                    />
                    <button onClick={handleSubmit}>Submit my review</button>

                    {
                        formFail
                            ? <p className="review-error">Your review seems a little short! Please enter more than two characters.</p>
                            : null 
                    }
                </form>
            </div>

            <div className="reviews-link-container">
                <p className="reviews-link">
                    <span className="emoji">💌</span>
                    {` `}
                    <Link to="/reviews">See all user reviews</Link>
                </p>
            </div>

            <div className="back-to-homepage">
                <span className="emoji">👉</span> <Link to="/">Back</Link>
            </div>
        </section>
    );
};

export default GamePage;
