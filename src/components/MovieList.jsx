//فـ MovieList يعتبر حلقة الوصل بين قائمة الأفلام و كارت الفيلم الواحد.
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="movies-grid">
      {movies.map(function (movie, index) {
        return <MovieCard key={index} movie={movie} />;
      })}
    </div>
  );
}

export default MovieList;
