import './App.css';
import {useEffect, useState} from 'react'; 
import axios from 'axios';
// Import components
import Form from './Form'

function App() {
	// suggestedGames will be displayed to the user
	const [suggestedGames, setSuggestedGames] = useState([]);

	// Stateful variables for the user's choices from the form component
	const [userPlatform, setUserPlatform] = useState('4');
	const [userGenre, setUserGenre] = useState('action');
	const [userTags, setUserTags] = useState(['singleplayer','atmospheric']); 

	// An array that will hold data returned by the API that match the user's choice of platform and tags - these will be further filtered down
	const initialResults = [];

	useEffect(() => {
		const apiKey = `92bb52f637714b219136e934ac1b2969`;

		const endpoints = [
            // These are three endpoints for three pages of data
            `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&ordering=-metacritic&genres=indie&metacritic=80,100&tags=${userTags}&platforms=${userPlatform}`,
            `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&ordering=-metacritic&genres=indie&metacritic=80,100&tags=${userTags}&platforms=${userPlatform}&page=2`,
            `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&ordering=-metacritic&genres=indie&metacritic=80,100&tags=${userTags}&platforms=${userPlatform}&page=3`,
        ]; 

		axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
		// Push each game object from each results array into the initialResults array
            .then((apiData) => {
				console.log(apiData);
				apiData.forEach((resultsArray) => {
					resultsArray.data.results.forEach((gameObject) => {
                        initialResults.push(gameObject);
                    });
				});
			})
			.then(console.log(initialResults));

		// When I'm done creating the form component, I'll pass userPlatform into the dependency array below
	}, []); 

	// A function that will be passed as props to the Form component and update the stateful variables holding the user's choices
	const userSelect = (event, chosenPlatform, chosenGenre, chosenTags) => {
		event.preventDefault(); 
		setUserPlatform(chosenPlatform);
		setUserGenre(chosenGenre);
		setUserTags(chosenTags);
	}

	// A function that filters through the data returned by the API and returns games that match the user's parameters

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