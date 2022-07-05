import styled from "styled-components";
import {
  Genres,
  MovieDetailInterface,
  ProductionCompanies,
  ProductionContiries,
} from "../api/api";
import { makeImagePath } from "../utility/utils";
import { BigCover, BigOverview, BigTitle } from "./Styled";

interface Detail {
  content: MovieDetailInterface;
}

const TitleDiv = styled.div`
  position: absolute;
  top: 0;
  height: 400px;
  width: 100%;
`;

const Relative = styled.div`
  position: sticky;
  top: 20px;
`;

const InfoDiv = styled.div`
  padding: 20px;
  position: relative;
  p {
    font-size: 18px;
    line-height: initial;
    span {
      font-weight: bold;
    }
  }
`;

interface Name {
  name: string;
}

function getNames<T extends Name>(array: T[]) {
  return array.map((x: T) => x.name + " ");
}

function replaceDateDarsh(date: string) {
  return date.replaceAll("-", ".");
}

function MovieDetail({ content }: Detail) {
  console.log(content);
  const genresArray = getNames<Genres>(content.genres);
  const contriesArray = getNames<ProductionContiries>(
    content.production_countries,
  );
  const companiesArray = getNames<ProductionCompanies>(
    content.production_companies,
  );

  const stars = Math.round(content.vote_average / 2);

  return (
    <Relative>
      <BigCover
        style={{
          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
            content?.backdrop_path,
            "w500",
          )})`,
        }}
      />
      <TitleDiv>
        <BigTitle>{content?.title}</BigTitle>
      </TitleDiv>
      <InfoDiv>
        <p>
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
        </p>
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

export default MovieDetail;
