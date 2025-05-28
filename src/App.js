import { useEffect, useState } from "react";

import MovieCard from './MovieCard';
import './App.css';
import searchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apiKey=f9531fe1'

// const movie = {
//     "Title": "Spiderman the Verse",
//     "Year": "2019–",
//     "imdbID": "tt12122034",
//     "Type": "series",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNDBjNWY3OWYtMjk2ZS00NjA2LWE0NzAtOWQxNzBhNjZlMGYyXkEyXkFqcGc@._V1_SX300.jpg"
// }

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);

        const data = await response.json();
        console.log(data);
        setMovies(data.Search);

    }
    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h1>No movie found</h1>
                        </div>
                    )
            }
        </div>
    )
}


export default App;