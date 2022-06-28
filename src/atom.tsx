import { atom } from "recoil";
import { Genres } from "./api/api";

export const movieGenre = atom<Genres[]>({
  key: "movieGenre",
  default: [],
});

export const tvGenre = atom<Genres[]>({
  key: "tvGenre",
  default: [],
});
