import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";

var apiKey = "5a0445e11690034aee950fa7c72cff95";

function Home() {
  var [movies, setMovies] = useState([]);
  var [page, setPage] = useState(1);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(false);
  var [query, setQuery] = useState("");

  var navigate = useNavigate();

  useEffect(
    function () {
      fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
          apiKey +
          "&page=" +
          page
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
        })
        .catch(function () {
          setError(true);
          setLoading(false);
        });
    },
    [page]
  );

  function searchMovie() {
    if (query.trim() === "") {
      return;
    }

    navigate("/search?query=" + encodeURIComponent(query));
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to our movie app</h1>

        <p>
          Millions of movies, TV shows and people to discover. Explore now.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search and explore...."
            value={query}
            onChange={function (event) {
              setQuery(event.target.value);
            }}
            onKeyDown={function (event) {
              if (event.key === "Enter") {
                searchMovie();
              }
            }}
          />

          <button onClick={searchMovie}>Search</button>
        </div>
      </section>

      <section className="now-playing">
        <h2>Now Playing</h2>

        {loading && <p>Loading movies...</p>}

        {error && (
          <p>Something went wrong. Please try again.</p>
        )}

        {!loading && !error && (
          <MovieList movies={movies} />
        )}

        {!loading && !error && (
          <Pagination
            page={page}
            setPage={setPage}
          />
        )}
      </section>
    </div>
  );
}

export default Home;