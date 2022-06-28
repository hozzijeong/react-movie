import { TvDetailInterface } from "../api/api";
import { makeImagePath } from "../utility/utils";
import { BigCover, BigOverview, BigTitle } from "./Styled";

interface Detail {
  content: TvDetailInterface;
}

function TvDetail({ content }: Detail) {
  console.log(content);
  return (
    <div style={{ position: "relative" }}>
      <BigCover
        style={{
          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
            content?.backdrop_path,
            "w500",
          )})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "400px",
          width: "100%",
        }}
      >
        <BigTitle>{content?.name}</BigTitle>
      </div>
      <BigOverview>{content?.overview}</BigOverview>
    </div>
  );
}

export default TvDetail;
