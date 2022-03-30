import { Routes, Route, Link } from 'react-router-dom';
// Import components
import Form from './components/Form';
import GamePage from './components/GamePage';
import UserReviews from './components/UserReviews'; 

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <header>
                    <Link to="/">
                        <h1>Indie Game Finder</h1>
                    </Link>
                    <div className="about-container">
                        <p>
                            Independent (or indie) games are created by
                            individual developers or smaller game studios
                            without the support of larger game publishers. As a
                            result, they're often unique, community-driven, and
                            made with a lot of heart. 💖
                        </p>
                        <p>
                            Use this app to find an indie game that suits you and leave a review if you've played it! 🎮
                        </p>
                        <div className="reviews-link-container">
                            <p className="reviews-link">
                                <span className="emoji">💌</span>
                                {` `}
                                <Link to="/reviews">See all user reviews</Link>
                            </p>
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/:gameId" element={<GamePage />} />
                    <Route path="/reviews" element={<UserReviews />} />
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
