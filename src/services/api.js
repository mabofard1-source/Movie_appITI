const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getNowPlayingMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}