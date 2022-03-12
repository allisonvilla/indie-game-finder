import './App.css';
import {useEffect, useState} from 'react'; 
import axios from 'axios';

function App() {
	// suggestedGames will be displayed to the user
	const [suggestedGames, setSuggestedGames] = useState([]);
	// Stateful variables for the user's choices from the form component
	const [userPlatform, setUserPlatform] = useState('pc');
	const [userGenre, setUserGenre] = useState('action');
	const [userTags, setUserTags] = useState(['singleplayer','atmospheric']); 

	// An array that will hold data returned by the API that match the user's choice of tags - these will be further filtered down
	const initialResults = [];

	useEffect(() => {
		const apiKey = `92bb52f637714b219136e934ac1b2969`;

		const endpoints = [
            `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&ordering=-metacritic&genres=indie&metacritic=90,100&tags=${userTags}&page=1`,
            `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&ordering=-metacritic&genres=indie&metacritic=90,100&tags=${userTags}&page=2`,
            `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&ordering=-metacritic&genres=indie&metacritic=90,100&tags=${userTags}&page=3`,
        ]; 

		axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
		// Push each game object from each results array into the initialResults array
            .then((apiData) => {
				apiData.forEach((resultsArray) => {
					resultsArray.data.results.forEach((gameObject) => {
                        initialResults.push(gameObject);
                    });
				});
			})
			.then(console.log(initialResults));

		// When I'm done creating the form component, I'll pass userChoiceTags into the dependency array below
	}, []); 

	// The API will only return maximum 40 results on a single page, requiring another url to see the next page - this will make it hard to search the entire database for games that match the user's chosen parameters
		// Narrow the results with the user's chosen tags, then filter for chosen genres with the data returned after that
		// I can also narrow the results by rating
			// Remember that the API will return every game with any of the chosen tags, not just games with all of the chosen tags
		// Make multiple API calls to return the rest of the data, push into a new array that will be responsible for holding the results of all the data 
		// Compare the user's chosen genres and tags with the games within the new array 

	return (
		<div className="App">
			<main>
				<h1>Indie Game Finder</h1>
			</main>
		</div>
	);
}

export default App;