import { useQuery } from "react-query";
import { getMovies, GetMovieList, Movie } from "../api/api";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { makeImagePath } from "../utility/utils";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import { useRecoilValue } from "recoil";
import { curMovieData } from "../atom";

const Wrapper = styled.div`
  background: black;
  padding-botom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

function Home() {
  const { data: nowPlaying, isLoading: nowPlayingIsLoading } =
    useQuery<GetMovieList>(["movies", "now_playing"], () =>
      getMovies("now_playing"),
    );

  const { data: latest, isLoading: latestIsLoading } = useQuery<GetMovieList>(
    ["movies", "latest"],
    () => getMovies("latest"),
  );

  const { data: topRated, isLoading: topRatedIsLoading } =
    useQuery<GetMovieList>(["movies", "top_rated"], () =>
      getMovies("top_rated"),
    );

  const { data: upComing, isLoading: upComingIsLoading } =
    useQuery<GetMovieList>(["movies", "upcoming"], () => getMovies("upcoming"));

  const nav = useNavigate();

  const curMovie = useRecoilValue(curMovieData);
  console.log(curMovie);
  const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:id");

  const { scrollY } = useViewportScroll();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (nowPlaying) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowPlaying.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const offset = 6;
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onOverlayClick = () => nav("/");

  const clickedMovie = (results: Movie[] | null) => {
    if (moviePathMatch?.params.id) {
      return results?.find(
        (movie) => movie.id + "" === moviePathMatch.params.id,
      );
    } else return null;
  };

  const isLoading =
    nowPlayingIsLoading ||
    latestIsLoading ||
    topRatedIsLoading ||
    upComingIsLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
          </Banner>

          {nowPlaying?.results ? (
            <Slider
              results={nowPlaying?.results}
              toggleLeaving={toggleLeaving}
              index={index}
              offset={offset}
              title="Now Playing"
              category="movies"
            />
          ) : null}
          {latest?.results ? (
            <Slider
              results={latest?.results}
              toggleLeaving={toggleLeaving}
              index={index}
              offset={offset}
              title="Latest"
              category="movies"
            />
          ) : null}

          {topRated?.results ? (
            <Slider
              results={topRated?.results}
              toggleLeaving={toggleLeaving}
              index={index}
              offset={offset}
              title="Top Rated"
              category="movies"
            />
          ) : null}

          {upComing?.results ? (
            <Slider
              results={upComing?.results}
              toggleLeaving={toggleLeaving}
              index={index}
              offset={offset}
              title="UPComing"
              category="movies"
            />
          ) : null}

          <AnimatePresence>
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
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
