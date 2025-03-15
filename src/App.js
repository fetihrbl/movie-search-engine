import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';

const API_URL = 'https://omdbapi.com?apikey=fe2f6c44';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search Movies
  const searchMovies = async (title) => {
    if (!title.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("No movies found");
      }
    } catch (err) {
      setError("Something went wrong!");
    }

    setLoading(false);
  };

  // Default movie search when page first loads
  useEffect(() => {
    searchMovies('SpiderMan');
  }, []);

  // Search when pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search App 🎬</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search For Movies..."
          value={searchTerm} // Hata düzeltilmiş
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => searchMovies(searchTerm)}>🔍</button>
      </div>

      {/* Loading Message */}
      {loading && <h2>Loading...</h2>}

      {/* Error Message */}
      {error && <h2>{error}</h2>}

      {/* Films Card */}
      {!loading && !error && movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : null}

      {/* No movies found message */}
      {!loading && !error && movies.length === 0 && (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
