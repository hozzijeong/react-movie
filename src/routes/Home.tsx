import { useQuery } from "react-query";
import {
  getMovies,
  GetMovieList,
  Movie,
  Genres,
  getContentGenre,
  GenreList,
} from "../api/api";
import { makeImagePath, sliceArr } from "../utility/utils";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { useRecoilState } from "recoil";
import { movieGenre, tvGenre } from "../atom";
import { Banner, Loader, Overview, Title, Wrapper } from "../components/Styled";
import { Overlay } from "../components/Overlay";

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

  const { data: getMovieGenres } = useQuery<GenreList>(["genre", "movie"], () =>
    getContentGenre("movie"),
  );

  const { data: getTvGenres } = useQuery<GenreList>(["genre", "tv"], () =>
    getContentGenre("tv"),
  );

  const [movieGenres, setMovieGenre] = useRecoilState(movieGenre);
  const [tvGenres, setTvGenre] = useRecoilState(tvGenre);
  useEffect(() => {
    if (!movieGenres.length) setMovieGenre(getMovieGenres?.genres as Genres[]);
    if (!tvGenres.length) setTvGenre(getTvGenres?.genres as Genres[]);
  }, []);

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
              results={sliceArr(nowPlaying?.results, offset, index)}
              toggleLeaving={toggleLeaving}
              index={index}
              // offset={offset}
              title="Now Playing"
              category="movies"
            />
          ) : null}

          {topRated?.results ? (
            <Slider
              results={sliceArr(topRated?.results, offset, index)}
              toggleLeaving={toggleLeaving}
              index={index}
              // offset={offset}
              title="Top Rated"
              category="movies"
            />
          ) : null}

          {upComing?.results ? (
            <Slider
              results={sliceArr(upComing?.results, offset, index)}
              toggleLeaving={toggleLeaving}
              index={index}
              // offset={offset}
              title="UPComing"
              category="movies"
            />
          ) : null}
          <Overlay category="movies" />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
