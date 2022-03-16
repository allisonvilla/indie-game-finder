import './App.css';
import { Routes, Route } from 'react-router-dom';
// Import components
import Form from './Form';
import GamePage from './GamePage';

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <header>
                    <h1>Indie Game Finder</h1>
                    <div className="about-container">
                        <p>Description text</p>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/:gameId" element={<GamePage />} />
                </Routes>
            </div>

            <footer>
                <p>Footer text goes here</p>
            </footer>
        </div>
    );
}

export default App;
