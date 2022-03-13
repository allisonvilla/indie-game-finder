import {useState} from 'react'; 

const Form = (props) => {
    const [platformValue, setPlatformValue] = useState('placeholder'); 
    const [genreValue, setGenreValue] = useState('placeholder');
    const [tagsValue, setTagsValue] = useState(['placeholder',]);

    // Change events for each of the inputs
    const changePlatform = (event) => {
        setPlatformValue(event.target.value);
    }

    const changeGenre = (event) => {
        setGenreValue(event.target.value);
    }

    // This might not work
    // Might to push the checked values into an array first and then set that as tagsValue
    const changeTags = (event) => {
        setTagsValue(event.target.value); 
    }

    // Submit event for the form 
    const formSubmit = (event) => {
        props.handleSubmit(event, platformValue, genreValue, tagsValue);
    }

    return (
        <form action="" onSubmit={formSubmit}>
            <h2>What are you looking for?</h2>

            <label htmlFor="platform">How do you like to play?</label>
            <select
                name="platform"
                id="platform"
                onChange={changePlatform}
                value={platformValue}
            >
                <option value="4">PC</option>
                <option value="5">MacOS</option>
                <option value="1">Xbox One</option>
                <option value="186">Xbox Series S/X</option>
                <option value="7">Nintendo Switch</option>
                <option value="18">PlayStation 4</option>
                <option value="187">PlayStation 5</option>
            </select>

            <label htmlFor="genre">What type of games do you like?</label>
            <select
                name="genre"
                id="genre"
                onChange={changeGenre}
                value={genreValue}
            >
                <option value="adventure">Adventure</option>
                <option value="action">Action</option>
                <option value="rpg">RPG</option>
                <option value="strategy">Strategy</option>
                <option value="simulation">Simulation</option>
                <option value="puzzle">Puzzle</option>
                <option value="platformer">Platformer</option>
            </select>

            <div className="tags-checkboxes">
                <p>
                    Please select any other tags you'd like to add to your
                    search.
                </p>

                <input
                    type="checkbox"
                    name="singleplayer"
                    value="singleplayer"
                    onChange={changeTags}
                />
                <label htmlFor="singleplayer">Singleplayer</label>

                <input
                    type="checkbox"
                    name="multiplayer"
                    value="multiplayer"
                    onChange={changeTags}
                />
                <label htmlFor="multiplayer">Multiplayer</label>

                <input
                    type="checkbox"
                    name="great-soundtrack"
                    value="great-soundtrack"
                    onChange={changeTags}
                />
                <label htmlFor="great-soundtrack">Great Soundtrack</label>

                <input
                    type="checkbox"
                    name="co-op"
                    value="co-op"
                    onChange={changeTags}
                />
                <label htmlFor="co-op">Co-op</label>

                <input
                    type="checkbox"
                    name="story-rich"
                    value="story-rich"
                    onChange={changeTags}
                />
                <label htmlFor="story-rich">Story Rich</label>

                <input
                    type="checkbox"
                    name="exploration"
                    value="exploration"
                    onChange={changeTags}
                />
                <label htmlFor="exploration">Exploration</label>

                <input
                    type="checkbox"
                    name="family-friendly"
                    value="family-friendly"
                    onChange={changeTags}
                />
                <label htmlFor="family-friendly">Family Friendly</label>

                <input
                    type="checkbox"
                    name="peaceful"
                    value="peaceful"
                    onChange={changeTags}
                />
                <label htmlFor="peaceful">Peaceful</label>

                <input
                    type="checkbox"
                    name="horror"
                    value="horror"
                    onChange={changeTags}
                />
                <label htmlFor="horror">Horror</label>
            </div>
        </form>
    );
}

export default Form; 