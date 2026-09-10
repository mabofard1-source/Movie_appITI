import { useState } from "react";
import { Link } from "react-router-dom";

function Watchlist() {
  var [watchlist, setWatchlist] = useState(function () {
    return (
      JSON.parse(localStorage.getItem("watchlist")) || []
    );
  });

  function removeMovie(id, type) {
    var updatedWatchlist = watchlist.filter(function (item) {
      return !(item.id === id && item.type === type);
    });

    setWatchlist(updatedWatchlist);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updatedWatchlist)
    );

    window.dispatchEvent(new Event("watchlistChanged"));
  }

  return (
    <div className="watchlist-page">
      <h1>My Watchlist</h1>

      {watchlist.length === 0 && (
        <p>Your watchlist is empty.</p>
      )}

      <div className="movies-grid">
        {watchlist.map(function (item) {
          var title = item.title || item.name;

          var date =
            item.release_date ||
            item.first_air_date;

          return (
            <div
              className="movie-card"
              key={item.type + "-" + item.id}
            >
              <Link
                to={
                  item.type === "tv"
                    ? "/tv-details/" + item.id
                    : "/details/" + item.id
                }
              >
                <div className="movie-image">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500" +
                      item.poster_path
                    }
                    alt={title}
                  />

                  <div className="movie-rating">
                    {Math.round(
                      item.vote_average * 10
                    )}
                    %
                  </div>
                </div>
              </Link>

              <div className="movie-info">
                <h3>{title}</h3>

                <p>{date}</p>

                <p>
                  {item.type === "tv"
                    ? "TV Show"
                    : "Movie"}
                </p>

                <button
                  onClick={function () {
                    removeMovie(
                      item.id,
                      item.type
                    );
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Watchlist;