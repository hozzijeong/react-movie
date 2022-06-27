import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { GetMovieList, GetTvList, searchMovie, searchTVShow } from "../api/api";
import { curContentData } from "../atom";
import Box from "../components/Box";
import { Overlay } from "../components/Overlay";
import { CategoryTitle, Loader, Wrapper } from "../components/Styled";

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
  );
  const { data: tvShow, isLoading: tvShowIsLoading } = useQuery<GetTvList>(
    ["searchTv", keyword],
    () => searchTVShow(keyword),
  );

  const [curContent, setCurContent] = useRecoilState(curContentData);

  const isLoading = movieIsLoading || tvShowIsLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <div style={{ height: "30vh" }}></div>
          <CategoryTitle>Movies</CategoryTitle>
          <GridTemplate onHoverStart={() => setCurContent(movies?.results)}>
            {movies?.results
              .filter((x) => x.backdrop_path !== "")
              .map((x) => (
                <Box key={x.id} data={x} category="movies" />
              ))}
          </GridTemplate>

          <CategoryTitle>Tv Show</CategoryTitle>
          <GridTemplate onHoverStart={() => setCurContent(tvShow?.results)}>
            {tvShow?.results
              .filter((x) => x.backdrop_path !== "")
              .map((x) => (
                <Box key={x.id} data={x} category="tv" />
              ))}
          </GridTemplate>
          <Overlay curContent={curContent} />
        </>
      )}
    </Wrapper>
  );
}

export default Search;
