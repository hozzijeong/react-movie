import { atom } from "recoil";
import { Movie, TvShow } from "./api/api";

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
