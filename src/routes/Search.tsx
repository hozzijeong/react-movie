import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { GetMovieList, GetTvList, searchMovie, searchTVShow } from "../api/api";
import Box from "../components/Box";
import { Overlay } from "../components/Overlay";
import { BigTitle, CategoryTitle, Loader, Wrapper } from "../components/Styled";

const GridTemplate = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, auto);
  gap: 15px;
  padding: 20px;
`;

function Search() {
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data: movies, isLoading: movieIsLoading } = useQuery<GetMovieList>(
    ["searchMovie", keyword],
    () => searchMovie(keyword),
    {
      onError: (e) => {
        console.log(e);
      },
    },
  );
  const { data: tvShow, isLoading: tvShowIsLoading } = useQuery<GetTvList>(
    ["searchTv", keyword],
    () => searchTVShow(keyword),
    {
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const isConsits =
    movies?.results.length === 0 && tvShow?.results.length === 0;

  const isLoading = movieIsLoading || tvShowIsLoading;

  const [isMovie, setIsMovie] = useState(true);

  return (
    <Wrapper>
      <div style={{ height: "30vh" }}></div>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : isConsits ? (
        <BigTitle style={{ textAlign: "center" }}>There Is No Result</BigTitle>
      ) : (
        <>
          <CategoryTitle>
            {movies?.results.length !== 0 ? "Movies" : null}
          </CategoryTitle>
          <GridTemplate onHoverStart={() => setIsMovie(true)}>
            {movies?.results
              .filter((x) => x.backdrop_path !== "")
              .map((x) => (
                <Box key={x.id} data={x} category="movies" />
              ))}
          </GridTemplate>

          <CategoryTitle>
            {tvShow?.results.length !== 0 ? "Tv Show" : null}
          </CategoryTitle>
          <GridTemplate onHoverStart={() => setIsMovie(false)}>
            {tvShow?.results
              .filter((x) => x.backdrop_path !== "")
              .map((x) => (
                <Box key={x.id} data={x} category="tv" />
              ))}
          </GridTemplate>
          <Overlay category={isMovie ? "movies" : "tv"} />
        </>
      )}
    </Wrapper>
  );
}

export default Search;
