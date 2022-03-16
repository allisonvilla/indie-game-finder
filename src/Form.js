import {useState, useRef} from 'react'; 
import { Navigate } from 'react-router-dom';

const Form = (props) => {
    const [platformValue, setPlatformValue] = useState(''); 
    const [genreValue, setGenreValue] = useState('');
    // Default to singleplayer games if the user does not choose any tags
    const [tagsValue, setTagsValue] = useState(['singleplayer']);
    // Stateful variable that triggers the redirect to the game details page - will be set to true on form submit
    const [toGamePage, setToGamePage] = useState(false);
    if (toGamePage) {
        return <Navigate to={`/${props.currentGameId}`} />;
    }

    console.log(props.currentGameId);

    // Change events for each of the inputs
    const changePlatform = (event) => {
        setPlatformValue(event.target.value);
    }

    const changeGenre = (event) => {
        setGenreValue(event.target.value);
    }

    // An array to hold the user's checked values that are to be submitted
    const checkedTags = [];

    // A function that returns the currently checked values when called
    const getCheckedValues = () => {
        const checkedValues = [];
        const checkboxes = document.querySelectorAll('.tag-checkbox');

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checkedValues.push(checkbox.value);
            }
        });
        return checkedValues; 
    }

    // A change event on the checkboxes, which calls getCheckedValues() and pushes its return to the checkedTags array 
    const changeTags = () => {
        // Run getCheckedValues and store its return in a variable
        const currentlyChecked = getCheckedValues();
        // Clear the checkedTags array to ensure that only currently checked values are contained within it
        checkedTags.splice(0);
        // Push each tag within currentlyChecked into the checkedTags array
        currentlyChecked.forEach((tag) => {
            checkedTags.push(tag);
        })
        setTagsValue(checkedTags);
    };

    // Submit event for the form 
    const formSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(platformValue, genreValue, tagsValue);
        setToGamePage(true);
    }

    return (
        <form action='' onSubmit={formSubmit}>
            <h2>What are you looking for?</h2>

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
                <option value="7">Nintendo Switch</option>
                <option value="1">Xbox One</option>
                <option value="186">Xbox Series S/X</option>
                <option value="18">PlayStation 4</option>
                <option value="187">PlayStation 5</option>
            </select>

            <label htmlFor="genre">What type of games do you like?</label>
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

            <div className="tags-checkboxes">
                <p>
                    Please select another tag you'd like to add to your search.
                </p>

                <input
                    className="tag-checkbox"
                    type="checkbox"
                    name="singleplayer"
                    value="singleplayer"
                    id="singleplayer"
                    onChange={changeTags}
                />
                <label htmlFor="singleplayer">Singleplayer</label>

                <input
                    className="tag-checkbox"
                    type="checkbox"
                    name="multiplayer"
                    value="multiplayer"
                    id="multiplayer"
                    onChange={changeTags}
                />
                <label htmlFor="multiplayer">Multiplayer</label>

                <input
                    className="tag-checkbox"
                    type="checkbox"
                    name="great-soundtrack"
                    value="great-soundtrack"
                    id="great-soundtrack"
                    onChange={changeTags}
                />
                <label htmlFor="great-soundtrack">Great Soundtrack</label>

                <input
                    className="tag-checkbox"
                    type="checkbox"
                    name="co-op"
                    value="co-op"
                    id="co-op"
                    onChange={changeTags}
                />
                <label htmlFor="co-op">Co-op</label>

                <input
                    className="tag-checkbox"
                    type="checkbox"
                    name="story-rich"
                    value="story-rich"
                    id="story-rich"
                    onChange={changeTags}
                />
                <label htmlFor="story-rich">Story Rich</label>

                <input
                    className="tag-checkbox"
                    type="checkbox"
                    name="exploration"
                    value="exploration"
                    id="exploration"
                    onChange={changeTags}
                />
                <label htmlFor="exploration">Exploration</label>

                <input
                    className="tag-checkbox"
                    type="checkbox"
                    name="family-friendly"
                    value="family-friendly"
                    id="family-friendly"
                    onChange={changeTags}
                />
                <label htmlFor="family-friendly">Family Friendly</label>

                <input
                    className="tag-checkbox"
                    type="checkbox"
                    name="peaceful"
                    value="peaceful"
                    id="peaceful"
                    onChange={changeTags}
                />
                <label htmlFor="peaceful">Peaceful</label>

                <input
                    className="tag-checkbox"
                    type="checkbox"
                    name="horror"
                    value="horror"
                    id="horror"
                    onChange={changeTags}
                />
                <label htmlFor="horror">Horror</label>

                <input
                    className="tag-checkbox"
                    type="checkbox"
                    name="roguelike"
                    value="roguelike"
                    id="roguelike"
                    onChange={changeTags}
                />
                <label htmlFor="roguelike">Roguelike</label>

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
            <button action="submit">Find a game!</button>
        </form>
    );
}

export default Form; 