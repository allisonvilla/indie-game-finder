import { useState, useEffect, useRef } from 'react'; 
import { Navigate } from 'react-router-dom';
import axios from 'axios'; 

// Import API key
import apiKey from '../api';

const Form = () => {
    // Stateful variable to hold the game that will be displayed to the user
    const [suggestedGame, setSuggestedGame] = useState({});

    // Stateful variables for the form input values prior to form submission
    const [platformValue, setPlatformValue] = useState('');
    const [genreValue, setGenreValue] = useState('');
    const [tagsValue, setTagsValue] = useState(['singleplayer']);
    // Default to singleplayer games if the user does not choose any tags

    // Stateful variables for the user's submitted choices
    const [userPlatform, setUserPlatform] = useState('');
    const [userGenre, setUserGenre] = useState('');
    const [userTags, setUserTags] = useState([]);

    // Stateful variable that triggers the redirect to the game details page - will be changed on form submit
    const [toGamePage, setToGamePage] = useState(false);

    // Stateful variables for errors - used to manipulate the render
    const [noGame, setNoGame] = useState(false);

    // Use useRef to check if it is the page's initial render - if it is, do not make the API call
    const initialRender = useRef(true);

    // Using useEffect, make an API call once the user has submitted the form, then filter through the data
    useEffect(() => {
        // A function that filters through the data returned by the API and returns games that match the user's parameters
        const gameFinder = (gamesArray) => {
            // An array that will hold the results from the first filter (genre)
            const firstFilter = [];
            // An array that will hold the final filtered results
            const finalResults = [];

            // Filter the results for games that match the user's chosen genre
            gamesArray.forEach((game) => {
                game.genres.forEach((genre) => {
                    let genreName = genre.slug;

                    if (genreName.includes(userGenre)) {
                        firstFilter.push(game);
                    }
                });
            });

            // Filter the results for games that match all of the user's chosen tags
            firstFilter.forEach((game) => {
                // An array that will hold the tags for each game so that we can compare them to userTags
                const tagArray = [];

                // A function that takes two arrays as parameters and checks that targetArray includes every value in checkedArray - returns a boolean value
                const matchChecker = (targetArray, checkedArray) =>
                    checkedArray.every((value) => targetArray.includes(value));

                game.tags.forEach((tag) => {
                    tagArray.push(tag.slug);

                    let isMatch = matchChecker(tagArray, userTags);

                    if (isMatch && finalResults.includes(game) === false) {
                        finalResults.push(game);
                    }
                });
            });

            // After filtering, randomize a result and set it as suggestedGame
            const arrayRandomizer = (array) => {
                const arrayIndex = Math.floor(Math.random() * array.length);
                return array[arrayIndex];
            };
            setSuggestedGame(arrayRandomizer(finalResults));

            // set toGamePage as true to redirect the user to the suggested game's info page
            setToGamePage(true);

            //
            if (finalResults.length <= 0) {
                setNoGame(true);
            }
        };

        // An array that will hold the total contents of each API call
        const apiArray = [];
        // A variable that will be used to check if the next page of API data exists
        let isNextNull = false;

        // An asynchronous function that will accept a page number as a parameter and make a request to the API using that page number
        async function getPageOfResults(page) {
            await axios
                .get(
                    `https://api.rawg.io/api/games?key=${apiKey}&page_size=125&ordering=-metacritic&genres=indie&tags=${userTags}&platforms=${userPlatform}&page=${page}`
                )
                .then((apiData) => {
                    if (apiData.data.next == null) {
                        isNextNull = true;
                    }
                    apiData.data.results.forEach((gameObject) => {
                        apiArray.push(gameObject);
                    });
                });
        }

        // An asynchronous function that will keep track of the current page of API data, whether the next page exists, and make a request for the next page using getPageOfResults() if it does exist
        async function getResults() {
            let page = 1;
            while (apiArray.length < 120 && isNextNull === false) {
                await getPageOfResults(page);
                page++;
            }
            // Call gameFinder() on the apiArray to filter through the results
            gameFinder(apiArray);
        }

        if (initialRender.current) {
            // If it is the initial render, set initialRender to false
            initialRender.current = false;
        } else {
            // If it isn't the initial render, make the API call
            getResults();
        }
        // Run this side effect when the user makes their choices
    }, [userPlatform, userTags, userGenre]);

    // Change events for each of the inputs
    const changePlatform = (event) => {
        setPlatformValue(event.target.value);
    };

    const changeGenre = (event) => {
        setGenreValue(event.target.value);
    };

    // An array to hold the user's checked values that are to be submitted
    const checkedTags = [];
    const checkboxes = document.querySelectorAll('.tag-checkbox');

    // A function that returns the currently checked values when called
    const getCheckedValues = () => {
        const checkedValues = [];

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checkedValues.push(checkbox.value);
            }
        });
        return checkedValues;
    };

    // A change event on the checkboxes, which calls getCheckedValues() and pushes its return to the checkedTags array
    const changeTags = () => {
        // Run getCheckedValues and store its return in a variable
        const currentlyChecked = getCheckedValues();
        // Clear the checkedTags array to ensure that only currently checked values are contained within it
        checkedTags.splice(0);
        // Push each tag within currentlyChecked into the checkedTags array
        currentlyChecked.forEach((tag) => {
            checkedTags.push(tag);
        });
        // Save the values in checkedTags in state
        setTagsValue(checkedTags);
    };

    // Submit event for the form
    const formSubmit = (event) => {
        event.preventDefault();
        // Save the form values in state
        setUserPlatform(platformValue);
        setUserGenre(genreValue);
        setUserTags(tagsValue);
        // Set noGame back to false
        setNoGame(false);
    };

    // Clear form button
    const clearForm = (event) => {
        event.preventDefault();
        // Reset state for each form element value
        setPlatformValue('');
        setGenreValue('');
        setTagsValue([]);
        // Reset checkboxes
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checkbox.click();
            }
        });
    };

    // When toGamePage is set to true, and suggestedGame has a value, redirect to the game info page for the suggested game
    while (toGamePage && suggestedGame !== undefined) {
        return <Navigate to={`/${suggestedGame.id}`} />;
    }

    return (
        <div className="form-container">
            <form action="" onSubmit={formSubmit} id="game-form">
                <h2>Let's find you a game!</h2>

                <label htmlFor="platform">How do you like to play?</label>
                <select
                    name="platform"
                    id="platform"
                    onChange={changePlatform}
                    value={platformValue}
                    required
                >
                    <option value="">Please select a platform</option>
                    <option value="4">PC</option>
                    <option value="5">MacOS</option>
                    <option value="7">Nintendo Switch</option>
                    <option value="18">PlayStation 4</option>
                    <option value="187">PlayStation 5</option>
                    <option value="1">Xbox One</option>
                    <option value="186">Xbox Series S/X</option>
                </select>

                <label htmlFor="genre">What genre of game do you enjoy?</label>
                <select
                    name="genre"
                    id="genre"
                    onChange={changeGenre}
                    value={genreValue}
                    required
                >
                    <option value="">Please select a genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="action">Action</option>
                    <option value="role-playing-games-rpg">RPG</option>
                    <option value="strategy">Strategy</option>
                    <option value="simulation">Simulation</option>
                    <option value="puzzle">Puzzle</option>
                    <option value="platformer">Platformer</option>
                </select>

                <p>
                    Please select any tags you'd like to add to your search. (Warning: selecting too many may result in a game not being found!)
                </p>
                <div className="tags-checkboxes">
                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="singleplayer"
                            value="singleplayer"
                            id="singleplayer"
                            onChange={changeTags}
                        />
                        <label htmlFor="singleplayer">Singleplayer</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="multiplayer"
                            value="multiplayer"
                            id="multiplayer"
                            onChange={changeTags}
                        />
                        <label htmlFor="multiplayer">Multiplayer</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="great-soundtrack"
                            value="great-soundtrack"
                            id="great-soundtrack"
                            onChange={changeTags}
                        />
                        <label htmlFor="great-soundtrack">
                            Great Soundtrack
                        </label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="co-op"
                            value="co-op"
                            id="co-op"
                            onChange={changeTags}
                        />
                        <label htmlFor="co-op">Co-op</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="story-rich"
                            value="story-rich"
                            id="story-rich"
                            onChange={changeTags}
                        />
                        <label htmlFor="story-rich">Story Rich</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="exploration"
                            value="exploration"
                            id="exploration"
                            onChange={changeTags}
                        />
                        <label htmlFor="exploration">Exploration</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="family-friendly"
                            value="family-friendly"
                            id="family-friendly"
                            onChange={changeTags}
                        />
                        <label htmlFor="family-friendly">Family Friendly</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="peaceful"
                            value="peaceful"
                            id="peaceful"
                            onChange={changeTags}
                        />
                        <label htmlFor="peaceful">Peaceful</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="horror"
                            value="horror"
                            id="horror"
                            onChange={changeTags}
                        />
                        <label htmlFor="horror">Horror</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="roguelike"
                            value="roguelike"
                            id="roguelike"
                            onChange={changeTags}
                        />
                        <label htmlFor="roguelike">Roguelike</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="metroidvania"
                            value="metroidvania"
                            id="metroidvania"
                            onChange={changeTags}
                        />
                        <label htmlFor="metroidvania">Metroidvania</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="pixel-graphics"
                            value="pixel-graphics"
                            id="pixel-graphics"
                            onChange={changeTags}
                        />
                        <label htmlFor="pixel-graphics">Pixel Graphics</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="retro"
                            value="retro"
                            id="retro"
                            onChange={changeTags}
                        />
                        <label htmlFor="retro">Retro</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="female-protagonist"
                            value="female-protagonist"
                            id="female-protagonist"
                            onChange={changeTags}
                        />
                        <label htmlFor="female-protagonist">
                            Female Protagonist
                        </label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="open-world"
                            value="open-world"
                            id="open-world"
                            onChange={changeTags}
                        />
                        <label htmlFor="open-world">Open World</label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="tag-checkbox"
                            type="checkbox"
                            name="short"
                            value="short"
                            id="short"
                            onChange={changeTags}
                        />
                        <label htmlFor="short">Short</label>
                    </div>
                </div>
                <button action="submit" className="submit">
                    Find an indie game!
                </button>
                <button className="clear-form" onClick={clearForm}>
                    Clear Form
                </button>

                {noGame ? (
                    <p className="error">
                        Sorry, we can't find any games like that in the database
                        right now! Why don't you try another search?
                    </p>
                ) : null}
            </form>
        </div>
    );
}

export default Form; 