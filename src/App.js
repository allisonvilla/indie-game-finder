import './App.css';
import {useEffect, useState} from 'react'; 
import axios from 'axios';

function App() {
	// suggestedGames will be displayed to the user
	const [suggestedGames, setSuggestedGames] = useState([]);
	// Stateful variables for the user's choices from the form component
	const [userChoiceGenres, setUserChoiceGenres] = useState([]);
	const [userChoiceTags, setUserChoiceTags] = useState([]); 

	// An array that will hold data returned by the API that match the user's choice of tags 
	const tagResults = [];

	useEffect(() => {
		axios({
            url: 'https://api.rawg.io/api/games',
            params: {
                key: '92bb52f637714b219136e934ac1b2969',
                page_size: 40,
                genres: 'indie',
                tags: 'multiple-endings,story-rich',
                // The API will only return maximum 40 results on a single page, requiring another url to see the next page - this will make it hard to search the entire database for games that match the user's chosen parameters
                	// Narrow the results with the user's chosen tags, then filter for chosen genres with the data returned after that
						// Remember that the API will return every game with any of the chosen tags, not just games with all of the chosen tags
					// Make multiple API calls to return the rest of the data, push into a new array that will be responsible for holding the results of all the data 
					// Compare the user's chosen genres and tags with the games within the new array 
            },
        }).then((apiData) => {
            console.log(apiData);
        }); 
	// When I'm done creating the form component, I'll eventually pass in userChoiceTags into the dependency array below
	}, []); 

	return (
		<div className="App">
			
		</div>
	);
}

export default App;