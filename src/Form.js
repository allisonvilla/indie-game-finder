import {useState} from 'react'; 

// Form will ask for: platform (dropdown), genre (dropdown), tags (checkboxes)
    // Need to figure out the IDs for each platform and set that as the value for the input, since the API request will only take the id #
    // PC - 4
    // macOS - 5
    // Xbox One - 1
    // Xbox 360 - 14 
    // Nintendo Switch - 7 
    // PlayStation 4 - 18
    // PlayStation 5 - 187

const Form = (props) => {
    const [platformValue, setPlatformValue] = useState('placeholder'); 
    const [genreValue, setGenreValue] = useState('placeholder');
    const [tagsValue, setTagsValue] = useState(['placeholder',])

    return (
        <form>
            
        </form>
    )
}

export default Form; 