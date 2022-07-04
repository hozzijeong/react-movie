import { getFilterd } from "../utility/utils";

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

export interface Genres {
  id: number;
  name: string;
}

export interface GenreList {
  genres: Genres[];
}

interface ProductionContiries {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguages {
  iso_639_1: string;
  name: string;
  english_name?: string;
}

export interface MovieDetailInterface {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null;
  production_countries: ProductionContiries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number; // 평점
  vote_count: number;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
interface Netword {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

interface Directors {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface TvDetailInterface {
  backdrop_path: string;
  created_by: Directors[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genres[];
  homepage: string;
  id: number;
  in_production: false;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: "2019-05-19";
    episode_number: 6;
    id: 1551830;
    name: "The Iron Throne";
    overview: "In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors.";
    production_code: "806";
    season_number: 8;
    still_path: "/3x8tJon5jXFa1ziAM93hPKNyW7i.jpg";
    vote_average: 4.8;
    vote_count: 106;
  };
  name: string;
  next_episode_to_air: null;
  networks: Netword[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_countries: ProductionContiries[];
  seasons: Season[];
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface Results {
  results: [];
}

export function getMovies(category: String) {
  return fetch(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then(returnFilterd);
}

export function getTVShow(category: String) {
  return fetch(`${BASE_PATH}/tv/${category}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then(returnFilterd);
}

export function searchTVShow(query: string | null) {
  return fetch(`${BASE_PATH}/search/tv/?api_key=${API_KEY}&query=${query}`)
    .then((response) => response.json())
    .then(returnFilterd);
}

export function searchMovie(query: string | null) {
  return fetch(`${BASE_PATH}/search/movie/?api_key=${API_KEY}&query=${query}`)
    .then((response) => response.json())
    .then(returnFilterd);
}

export function getContentGenre(content: string) {
  return fetch(
    `${BASE_PATH}/genre/${content}/list?api_key=${API_KEY}&language=en-US`,
  ).then((response) => response.json());
}

export function getMovieDetail(id: number) {
  return fetch(
    `${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=en-US`,
  ).then((response) => response.json());
}
export function getTvDetail(id: number) {
  return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=en-US`).then(
    (response) => response.json(),
  );
}

const returnFilterd = <T extends Results>(json: T) => {
  const filterd = json.results?.filter(getFilterd);
  return { ...json, results: filterd };
};
