import { TvDetailInterface } from "../api/api";
import { makeImagePath, replaceDateDarsh } from "../utility/utils";
import {
  BigCover,
  BigOverview,
  BigTitle,
  InfoDiv,
  Relative,
  TitleDiv,
} from "./Styled";

interface Detail {
  content: TvDetailInterface;
}

function TvDetail({ content }: Detail) {
  console.log(content);

  const stars = Math.round(content.vote_average / 2);

  return (
    <Relative>
      <BigCover imagePath={makeImagePath(content?.backdrop_path, "w500")} />
      <TitleDiv>
        <BigTitle>{content?.name}</BigTitle>
      </TitleDiv>
      <InfoDiv>
        {/* <p>
          <span>Release Date</span>: {replaceDateDarsh(content.release_date)}
        </p>
        <p>
          <span>Genres</span>: {genresArray}
        </p>
        <p>
          <span>Production Contiries</span>: {contriesArray}
        </p>
        <p>
          <span>Runnig Time</span>: {content.runtime}min
        </p>
        <p>
          <span>Production Companies</span>: {companiesArray}
        </p> */}
        <p>
          <span>Rating</span>: {"🌕".repeat(stars)}
          {"🌑".repeat(5 - stars)}
        </p>
        <BigOverview>
          <h1>{content.tagline}</h1>
          {content?.overview}
        </BigOverview>
      </InfoDiv>
    </Relative>
  );
}

export default TvDetail;
