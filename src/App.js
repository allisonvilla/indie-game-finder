import './App.css';
import { useEffect, useState, useRef } from 'react'; 
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
// Import components
import Form from './Form'; 
import GamePage from './GamePage';

function App() {
    // Stateful variable to hold the game that will be displayed to the user
    const [suggestedGame, setSuggestedGame] = useState({});

    // Stateful variables for the user's choices from the form component
    const [userPlatform, setUserPlatform] = useState('');
    const [userGenre, setUserGenre] = useState('');
    const [userTags, setUserTags] = useState([]);

    // Use useRef to check if it is the page's initial render - if it is, do not make the API call
    const initialRender = useRef(true);

    // A function that is passed as props to the Form component and updates the stateful variables holding the user's choices
    const userSelect = (chosenPlatform, chosenGenre, chosenTags) => {
        setUserPlatform(chosenPlatform);
        setUserGenre(chosenGenre);
        setUserTags(chosenTags);
    };

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

                if (isMatch && finalResults.includes(game) == false) {
                    finalResults.push(game);
                    console.log('Found some matching tags - your filter is still working');
                }
            });
        });
        // After filtering, randomize a result and set it as suggestedGame
        const arrayRandomizer = (array) => {
            const arrayIndex = Math.floor(Math.random() * array.length);
            return array[arrayIndex];
        };
        setSuggestedGame(arrayRandomizer(finalResults));
    };

    // Using useEffect, make an API call once the user has submitted the form
    useEffect(() => {
        const apiKey = `92bb52f637714b219136e934ac1b2969`;

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
                        //console.log(apiArray);
                        //console.log(isNextNull);
                    });
                });
        }

        // An asynchronous function that will keep track of the current page of API data, whether the next page exists, and make a request for the next page using getPageOfResults() if it does exist
        async function getResults() {
            let page = 1;
            while (apiArray.length < 120 && isNextNull == false) {
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
    // Run this side effect when the user submits the form
    }, [userTags, userPlatform]);


    return (
        <div className="App">
            <div className="wrapper">
                <header>
                    <h1>Indie Game Finder</h1>
                    <div className="about-container">
                        <p>Description text</p>
                    </div>
                </header>

                <main>
                    <Form handleSubmit={userSelect} />
                    <GamePage currentGame={suggestedGame} /> 

                    {/* {Object.keys(suggestedGame).length > 0 ? <Results /> : null} */}
                </main>

                <footer>
                    <p>Footer text goes here</p>
                </footer>

                
                
            </div>
        </div>
    );
}

// Routes Planning:
// - I want the header and the footer to show on every page 
// - I want the form component to show on the homepage
// - Each game will have its own link, using its id - when the filter returns a game, it will link to it

export default App;