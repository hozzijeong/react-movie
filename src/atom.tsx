import { atom } from "recoil";
import { Genres, Movie, TvShow } from "./api/api";

export const curMovieData = atom<Movie[] | null>({
  key: "movieList",
  default: null,
});

export const curTvData = atom<TvShow[] | null>({
  key: "tvList",
  default: null,
});

export const curContentData = atom<any>({
  key: "searchList",
  default: null,
});

export const movieGenre = atom<Genres[]>({
  key: "movieGenre",
  default: [],
});

export const tvGenre = atom<Genres[]>({
  key: "tvGenre",
  default: [],
});
