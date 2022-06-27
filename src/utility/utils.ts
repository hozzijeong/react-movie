export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function sliceArr<T>(arr: T[], offset: number, index: number): T[] {
  return arr.slice(offset * index, offset * index + offset);
}
