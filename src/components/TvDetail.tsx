import { TvDetailInterface } from "../api/api";

interface Detail {
  content: TvDetailInterface;
}

function TvDetail({ content }: Detail) {
  console.log(content);
  return null;
}

export default TvDetail;
