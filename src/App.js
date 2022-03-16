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
                        <p>Description text.</p>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/:gameId" element={<GamePage />} />
                </Routes>
            </div>

            <footer>
                <p>
                    Built by{` `}
                    <a
                        href="https://github.com/allisonvilla"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Allison Villa
                    </a>
                </p>
                <p className="small-copy">
                    Data provided by{` `}
                    <a
                        href="https://rawg.io/apidocs"
                        target="_blank"
                        rel="noreferrer"
                    >
                        RAWG Video Games Database API
                    </a>
                </p>
                <p className="small-copy">
                    Created at{` `}
                    <a
                        href="https://junocollege.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Juno College of Technology
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;
