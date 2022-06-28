import { MovieDetailInterface } from "../api/api";

interface Detail {
  content: MovieDetailInterface;
}

function MovieDetail({ content }: Detail) {
  console.log(content);
  return null;
}

export default MovieDetail;
