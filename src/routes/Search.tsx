import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import {
  PathMatch,
  useMatch,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  GetMovieList,
  GetTvList,
  Movie,
  searchMovie,
  searchTVShow,
  TvShow,
} from "../api/api";
import { curContentData } from "../atom";
import Box from "../components/Box";
import {
  BigCover,
  BigMovie,
  BigOverview,
  BigTitle,
  CategoryTitle,
  Loader,
  Overlay,
  Wrapper,
} from "../components/Styled";
import { makeImagePath } from "../utility/utils";

const GridTemplate = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, auto);
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

  const searchPathMatch: PathMatch<string> | null = useMatch("/search/:id");
  const [curContent, setCurContent] = useRecoilState(curContentData);
  const nav = useNavigate();
  const { scrollY } = useViewportScroll();

  const isLoading = movieIsLoading || tvShowIsLoading;

  const onOverlayClick = () => nav(`/search?keyword=${keyword}`);

  const clickedContent = (results: any[] | null) => {
    if (searchPathMatch?.params.id && results) {
      return results?.find(
        (data: Movie | TvShow) => data.id + "" === searchPathMatch.params.id,
      );
    } else return null;
  };
  console.log(curContent);

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
          <AnimatePresence>
            {searchPathMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={searchPathMatch.params.id}
                >
                  {clickedContent(curContent) && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedContent(curContent)?.backdrop_path as string,
                            "w500",
                          )})`,
                        }}
                      />
                      <BigTitle>
                        {clickedContent(curContent)?.title
                          ? clickedContent(curContent)?.title
                          : clickedContent(curContent)?.name}
                      </BigTitle>
                      <BigOverview>
                        {clickedContent(curContent)?.overview}
                      </BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
