import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  GetMovieList,
  GetTvList,
  Movie,
  searchMovie,
  searchTVShow,
  TvShow,
} from "../api/api";
import Slider from "../components/Slider";
import {
  BigCover,
  BigMovie,
  BigOverview,
  BigTitle,
  Loader,
  Overlay,
  Overview,
  Title,
  Wrapper,
} from "../components/Styled";
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

  const nav = useNavigate();
  const { scrollY } = useViewportScroll();

  const [index, setIndex] = useState(0);

  const isLoading = movieIsLoading || tvShowIsLoading;

  const offset = 5;

  const onOverlayClick = () => nav("/serach");

  // const clickedMovie = (results: Movie[] | TvShow[] | null) => {
  //   if (moviePathMatch?.params.id) {
  //     return results?.find(
  //       (movie) => movie.id + "" === moviePathMatch.params.id,
  //     );
  //   } else return null;
  // };

  console.log(movies, tvShow);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {movies?.results ? (
            <Slider
              results={movies?.results}
              index={index}
              offset={offset}
              title="Movies"
              category="movies"
            />
          ) : null}

          {tvShow?.results ? (
            <Slider
              results={tvShow?.results}
              index={index}
              offset={offset}
              title="TV Show"
              category="tv"
            />
          ) : null}

          {/* <AnimatePresence>
            {moviePathMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={moviePathMatch.params.id}
                >
                  {clickedMovie(curMovie) && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie(curMovie)?.backdrop_path as string,
                            "w500",
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie(curMovie)?.title}</BigTitle>
                      <BigOverview>
                        {clickedMovie(curMovie)?.overview}
                      </BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence> */}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
