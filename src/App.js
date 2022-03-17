import './index.css';
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
                        <p>Independent (or indie) games are created by individual developers or smaller game studios without the support of larger game publishers. As a result, they're often unique, community-driven, and made with a lot of heart. 💖</p>
                        <p>Use this app to find an indie game that suits your tastes! 🎮</p>
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
