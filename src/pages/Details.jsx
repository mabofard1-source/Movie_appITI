import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";

function Details() {
  var { id } = useParams();

  var [movie, setMovie] = useState(null);
  var [recommended, setRecommended] = useState([]);
  var [reviews, setReviews] = useState([]);

  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(false);

  useEffect(
    function () {
      var apiKey = "5a0445e11690034aee950fa7c72cff95";

      fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }

          return response.json();
        })
        .then(function (data) {
          setMovie(data);
          setLoading(false);
        })
        .catch(function () {
          setError(true);
          setLoading(false);
        });

      fetch(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "/recommendations?api_key=" +
          apiKey,
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setRecommended(data.results || []);
        });

      fetch(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "/reviews?api_key=" +
          apiKey,
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setReviews(data.results || []);
        });
    },
    [id],
  );

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try again.</p>;
  }

  return (
    <div className="movie-details">
      {" "}
      <div className="details-info">
        <img
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          alt={movie.title}
        />

        <div>
          <h1>{movie.title}</h1>

          <p>{movie.release_date}</p>

          <p>Rating: {Math.round(movie.vote_average * 10)}%</p>

          <p>{movie.overview}</p>
        </div>
      </div>
      <section className="recommendations">
        <h2>Recommended Movies</h2>

        <div className="movies-grid">
          {recommended.map(function (item) {
            return <MovieCard key={item.id} movie={item} />;
          })}
        </div>
      </section>
      <section className="reviews">
        <h2>Reviews</h2>

        {reviews.length === 0 && <p>No reviews available.</p>}

        {reviews.map(function (review) {
          return (
            <div className="review" key={review.id}>
              <h3>{review.author}</h3>

              <p>{review.content}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Details;
