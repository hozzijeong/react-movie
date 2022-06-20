const API_KEY = "83abefa42986ae190c0bbb24c6d2e0ae";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TvShow {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface GetMovieList {
  dates?: { maximum: string; minimum: string };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GetTvList {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

export function getMovies(category: String) {
  return fetch(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`).then(
    (response) => response.json(),
  );
}

export function getTVShow(category: String) {
  return fetch(`${BASE_PATH}/tv/${category}?api_key=${API_KEY}`).then(
    (response) => response.json(),
  );
}
