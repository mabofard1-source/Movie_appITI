import { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, type = "movie" }) {
//        state    function
  var [favorite, setFavorite] = useState(function () {
    var watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    return watchlist.some(function (item) {
      return item.id === movie.id && item.type === type;
    });
  });

  function toggleWatchlist() {  // بدل الحالة زرار المفضلة
    var watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    var exists = watchlist.some(function (item) {
      return item.id === movie.id && item.type === type;
    });

    if (exists) {
      watchlist = watchlist.filter(function (item) {
        return !(item.id === movie.id && item.type === type);
      });

      setFavorite(false);
    } else {
      watchlist.push({  // object
        id: movie.id,
        title: movie.title,
        name: movie.name,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        first_air_date: movie.first_air_date,
        type: type,
      });

      setFavorite(true);
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
//عشان نحدث عدد العناصر في الـ Navbar. بلغ ان حصل تغيير         Event
    window.dispatchEvent(new Event("watchlistChanged")); // navbar هو اللي مستني الحدث دا
  }

  var title = movie.title || movie.name; 
  var date = movie.release_date || movie.first_air_date;
// JSX
  return (
    <div className="movie-card">
      <Link
      //           ternary operator            true           false
        to={type === "tv" ? "/tv-details/" + movie.id : "/details/" + movie.id}
      >
        <div className="movie-image">
          <img
          //          Base URL + Poster Path"TMDB"
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt={title}
          />

          <div className="movie-rating">
            {Math.round(movie.vote_average * 10)}%
          </div>

        </div>
      </Link>

      <div className="movie-info">
        <h3>{title}</h3>

        <p>{date}</p>

        <button
          className={favorite ? "heart favorite" : "heart"}
          onClick={toggleWatchlist}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;//خلّي الـ Component ده متاح للملفات التانية عشان تقدر تستخدمه.
