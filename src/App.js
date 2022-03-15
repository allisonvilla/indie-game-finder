import './App.css';
import {useEffect, useState, useRef} from 'react'; 
import axios from 'axios';
// Import components
import Form from './Form'; 

function App() {
    // Stateful variable to hold the game that will be displayed to the user
    const [suggestedGame, setSuggestedGame] = useState([]);

    // Stateful variables for the user's choices from the form component
    const [userPlatform, setUserPlatform] = useState('');
    const [userGenre, setUserGenre] = useState('');
    const [userTags, setUserTags] = useState([]);

    // Use useRef to check if it is the page's initial render - if it is, do not make the API call
    const initialRender = useRef(true);

    // A function that is passed as props to the Form component and updates the stateful variables holding the user's choices
    const userSelect = (event, chosenPlatform, chosenGenre, chosenTags) => {
        event.preventDefault();
        setUserPlatform(chosenPlatform);
        setUserGenre(chosenGenre);
        setUserTags(chosenTags);
    };

    // A function that filters through the data returned by the API and returns games that match the user's parameters
	const gameFinder = (gamesArray) => {
		const filteredResults = [];

		let matchChecker = (originalArray, checkedArray) =>
            checkedArray.every((x) => originalArray.includes(x));

		gamesArray.forEach((game) => {
			// Filter the results for games that match the user's chosen genre
			game.genres.forEach((genre) => {
				let genreName = genre.slug; 

				if (genreName.includes(userGenre)) {
					filteredResults.push(game);
				}
			});

			// Filter the results for games that match all of the user's chosen tags
			game.tags.forEach((tag) => {
				let tagName = tag.slug;
				
				// isMatch isn't working properly
				let isMatch = matchChecker(tagName, userTags);

				if (isMatch && filteredResults.includes(game) == false) {
					filteredResults.push(game);
					console.log('Found some matching tags');
				}
			});
		});
		// After filtering, randomize a result and pass it as an argument to setSuggestedGame() 
		console.log(filteredResults);
	}

	// Using useEffect, make an API call once the user has submitted the form
    useEffect(() => {
        const apiKey = `92bb52f637714b219136e934ac1b2969`;

        // An array that will hold the total contents of each API call
        const apiArray = [];

        const endpoints = [
            // These are three endpoints for three pages of data
            `https://api.rawg.io/api/games?key=${apiKey}&page_size=125&ordering=-metacritic&genres=indie&tags=${userTags}&platforms=${userPlatform}`,
            `https://api.rawg.io/api/games?key=${apiKey}&page_size=125&ordering=-metacritic&genres=indie&tags=${userTags}&platforms=${userPlatform}&page=2`,
            `https://api.rawg.io/api/games?key=${apiKey}&page_size=125&ordering=-metacritic&genres=indie&tags=${userTags}&platforms=${userPlatform}&page=3`,
        ];

        if (initialRender.current) {
            initialRender.current = false;
        } else {
            axios
                .all(endpoints.map((endpoint) => axios.get(endpoint)))
                // Push each game object from each results array into apiArray
                .then((apiData) => {
                    console.log(apiData);
                    apiData.forEach((resultsArray) => {
                        resultsArray.data.results.forEach((gameObject) => {
                            apiArray.push(gameObject);
                        });
                    });
                })
                .then(() => {
                    gameFinder(apiArray);
                    console.log(apiArray);
                });
        }
        // Run this side effect when the user submits the form
    }, [userTags, userPlatform]);

    return (
        <div className="App">
            <header>
                <h1>Indie Game Finder</h1>
            </header>
            <main>
                <Form handleSubmit={userSelect} />
            </main>
        </div>
    );
}

export default App;