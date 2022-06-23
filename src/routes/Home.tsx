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
import {
  Banner,
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

function Home() {
  const { data: nowPlaying, isLoading: nowPlayingIsLoading } =
    useQuery<GetMovieList>(["movies", "now_playing"], () =>
      getMovies("now_playing"),
    );

  const { data: latest, isLoading: latestIsLoading } = useQuery<Movie>(
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
            bgPhoto={makeImagePath(latest?.backdrop_path || "")}
          >
            <Title>{latest?.title}</Title>
            <Overview>{latest?.overview}</Overview>
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
