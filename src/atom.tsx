import { atom } from "recoil";
import { GetMovieList, Movie, TvShow } from "./api/api";

export const curMovieData = atom<Movie[] | null>({
  key: "movieList",
  default: null,
});

export const curTvData = atom<TvShow[] | null>({
  key: "tvList",
  default: null,
});
