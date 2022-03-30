# Indie Game Finder
### [Live Link]("https://indie-game-finder.netlify.app/")
<br>

<!-- gif preview here -->

## About
Indie Game Finder is an application that helps users find an indie game to play that suits their preferences. It filters through paginated data returned by [RAWG Video Games Database API]("https://rawg.io/apidocs") to a display a game to the user based on their chosen parameters.

Users are also able to leave a review on each game page and view reviews written by other users on the reviews page. Reviews are stored in a Firebase Realtime Database. 
<br>

## Running this project locally
1. Clone this repository
2. In your terminal, `cd` into the directory where you cloned this repository
3. Install dependencies - in your terminal, run `npm install`
4. Create a [Firebase app]("https://firebase.google.com/")
5. In your Firebase app, create a Realtime Database
6. Within the `/src` folder of the project directory, create `firebaseConfig.js` and initialize your Firebase Realtime Database app within a variable called `firebase` - export this variable
7. Obtain an API key from [RAWG Video Games Database API]("https://rawg.io/apidocs")
8. Within the `/src` folder of the project directory, create `api.js` and create a variable to store your API key - export this variable
9. Within your terminal, run `npm start` to run the app on your local server  

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