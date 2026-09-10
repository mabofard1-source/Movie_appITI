import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";

var apiKey = "5a0445e11690034aee950fa7c72cff95";

function Search() {
  var [searchParams, setSearchParams] = useSearchParams();

  var [query, setQuery] = useState(
    searchParams.get("query") || ""
  );

  var [movies, setMovies] = useState([]);
  var [loading, setLoading] = useState(false);
  var [error, setError] = useState(false);

  var searchQuery = searchParams.get("query");

  useEffect(
    function () {
      if (!searchQuery) {
        return;
      }

      fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=" +
          apiKey +
          "&query=" +
          encodeURIComponent(searchQuery)
      )
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }

          return response.json();
        })
        .then(function (data) {
          setMovies(data.results);
          setLoading(false);
          setError(false);
        })
        .catch(function () {
          setError(true);
          setLoading(false);
        });
    },
    [searchQuery]
  );

  function searchMovies() {
    if (query.trim() === "") {
      return;
    }

    setLoading(true);
    setError(false);

    setSearchParams({
      query: query
    });
  }

  return (
    <div className="search-page">
      <h1>Search Movies</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={function (event) {
            setQuery(event.target.value);
          }}
          onKeyDown={function (event) {
            if (event.key === "Enter") {
              searchMovies();
            }
          }}
        />

        <button onClick={searchMovies}>Search</button>
      </div>

      {loading && <p>Searching...</p>}

      {error && (
        <p>Something went wrong. Please try again.</p>
      )}

      {!loading &&
        !error &&
        movies.length === 0 &&
        searchQuery && (
          <p>No movies found.</p>
        )}

      {!loading &&
        !error &&
        movies.length > 0 && (
          <div className="movies-grid">
            {movies.map(function (movie) {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              );
            })}
          </div>
        )}
    </div>
  );
}

export default Search;