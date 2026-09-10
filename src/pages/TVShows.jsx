import { useEffect, useState } from "react";

import MovieCard from "../components/MovieCard";

var apiKey = "5a0445e11690034aee950fa7c72cff95";

function TVShows() {
  var [shows, setShows] = useState([]);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(false);

  useEffect(function () {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=" +
        apiKey
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        return response.json();
      })
      .then(function (data) {
        setShows(data.results);
        setLoading(false);
      })
      .catch(function () {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading TV shows...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try again.</p>;
  }

  return (
    <div className="tv-shows">
      <h1>Popular TV Shows</h1>

      <div className="movies-grid">
        {shows.map(function (show) {
          return (
            <MovieCard
              key={show.id}
              movie={show}
              type="tv"
            />
          );
        })}
      </div>
    </div>
  );
}

export default TVShows;