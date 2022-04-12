# Indie Game Finder

### [Live Link](https://indie-game-finder.netlify.app/ "Live link")

## About
Indie Game Finder is an application that helps users find an indie game to play that suits their preferences. It filters through paginated data returned by [RAWG Video Games Database API](https://rawg.io/apidocs) to a display a game to the user based on their chosen parameters.

Users are also able to leave a review on each game page and view reviews written by other users on the reviews page. Reviews are stored in a Firebase Realtime Database. 

## Running this project locally
1. Clone this repository
2. In your terminal, `cd` into the directory where you cloned this repository
3. Install dependencies - in your terminal, run `npm install`
4. Create a [Firebase app](https://firebase.google.com/)
5. In your Firebase app, create a Realtime Database
6. Within the `/src` folder of the project directory, create `firebaseConfig.js` and initialize your Firebase Realtime Database within a variable called `firebase` - export this variable

```js
// firebaseConfig.js

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    // your Firebase config details here
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase; 
```

7. Within the root folder of the project directory, create a `.env` file
8. Within the `.env` file, create an environment variable called `REACT_APP_FIREBASE_KEY` and store the API key from your Firebase config in it 
```js
// .env

REACT_APP_FIREBASE_KEY=12345 // your actual Firebase key here
```

9. Within `firebaseConfig.js`, replace your API key with `process.env.REACT_APP_FIREBASE_KEY` 
```js
// firebaseConfig.js

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,

    // The rest of your config here
};
```

10. Obtain an API key from [RAWG Video Games Database API](https://rawg.io/apidocs)
11. Within `.env`, create an environment variable called `REACT_APP_API_KEY` and store your API key in it

```js
// .env 

REACT_APP_API_KEY=12345 // your actual API key here
```

12. Within your terminal, run `npm start` to run the app on your local server  

## Dependencies
- React
- Axios
- Firebase
- React Router DOM

## Concepts Learned & Practiced
- Creating my first React app! 🎉
- Working with paginated data returned from an API
- Storing user input in a database and retrieving it to display on the page
- Using React Router to create a single-page application 
- Understanding functional programming
- Understanding the importance of app architecture planning
- Using environment variables

## Preview
![indie-game-finder-preview](https://user-images.githubusercontent.com/85526859/160727349-770883b3-c505-4077-9f05-bfffb95d321e.gif)