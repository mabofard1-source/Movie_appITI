import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

var apiKey = "5a0445e11690034aee950fa7c72cff95";

function TVDetails() {
  var { id } = useParams();

  var [show, setShow] = useState(null);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(false);

  useEffect(function () {
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        id +
        "?api_key=" +
        apiKey
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        return response.json();
      })
      .then(function (data) {
        setShow(data);
        setLoading(false);
      })
      .catch(function () {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading TV show details...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try again.</p>;
  }

  return (
    <div className="movie-details">
      <div className="details-info">
        <img
          src={
            "https://image.tmdb.org/t/p/w500" +
            show.poster_path
          }
          alt={show.name}
        />

        <div>
          <h1>{show.name}</h1>

          <p>{show.first_air_date}</p>

          <p>
            Rating: {Math.round(show.vote_average * 10)}%
          </p>

          <p>{show.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default TVDetails;