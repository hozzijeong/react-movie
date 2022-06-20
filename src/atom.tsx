import { atom } from "recoil";
import { GetMovieList, Movie } from "./api/api";

export const curMovieData = atom<Movie[] | null>({
  key: "movieList",
  default: null,
});
