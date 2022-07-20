import { Genres } from "../api/api";

interface FilterCondition {
  backdrop_path: string;
}

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function sliceArr<T>(arr: T[], offset: number, index: number): T[] {
  return arr.slice(offset * index, offset * index + offset);
}

export const incraseIndex = (
  length: number,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  leaving: boolean,
  setLeaving: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const offset = 6;
  if (length) {
    if (leaving) return;
    setLeaving((prev: boolean) => !prev);
    const totalMovies = length - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    setIndex((prev: number) => (prev === maxIndex ? 0 : prev + 1));
  }
};

export const getFilterd = <T extends FilterCondition>(x: T): boolean =>
  x.backdrop_path !== null;

export const findGenres = (x: number, contentGenres: Genres[]) =>
  contentGenres?.find((ele) => ele.id === x)?.name;

interface Name {
  name: string;
}

export function getNames<T extends Name>(array: T[]) {
  return array.map((x: T) => x.name + " ");
}

export function replaceDateDarsh(date: string) {
  return date.replaceAll("-", ".");
}
