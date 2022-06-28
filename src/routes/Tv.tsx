import { useQuery } from "react-query";
import { GetTvList, getTVShow, TvShow } from "../api/api";
import { makeImagePath, sliceArr } from "../utility/utils";
import { useState } from "react";
import Slider from "../components/Slider";
import { Banner, Loader, Overview, Title, Wrapper } from "../components/Styled";
import { Overlay } from "../components/Overlay";

function Tv() {
  const { data: airingToday, isLoading: airingTodayIsLoading } =
    useQuery<GetTvList>(["tv", "airing_today"], () =>
      getTVShow("airing_today"),
    );

  const { data: latest, isLoading: latestIsLoading } = useQuery<TvShow>(
    ["tv", "latest"],
    () => getTVShow("latest"),
  );

  const { data: topRated, isLoading: topRatedIsLoading } = useQuery<GetTvList>(
    ["tv", "top_rated"],
    () => getTVShow("top_rated"),
  );

  const { data: popular, isLoading: popularIsLoading } = useQuery<GetTvList>(
    ["tv", "popular"],
    () => getTVShow("popular"),
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (airingToday) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = airingToday.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const offset = 6;
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const isLoading =
    airingTodayIsLoading ||
    latestIsLoading ||
    topRatedIsLoading ||
    popularIsLoading;
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
            <Title>{latest?.name}</Title>
            <Overview>{latest?.overview}</Overview>
          </Banner>

          {airingToday?.results ? (
            <Slider
              results={sliceArr(airingToday?.results, offset, index)}
              toggleLeaving={toggleLeaving}
              index={index}
              // offset={offset}
              title="Airing Today"
              category="tv"
            />
          ) : null}

          {topRated?.results ? (
            <Slider
              results={sliceArr(topRated?.results, offset, index)}
              toggleLeaving={toggleLeaving}
              index={index}
              // offset={offset}
              title="Top Rated"
              category="tv"
            />
          ) : null}

          {popular?.results ? (
            <Slider
              results={sliceArr(popular?.results, offset, index)}
              toggleLeaving={toggleLeaving}
              index={index}
              // offset={offset}
              title="Popular"
              category="tv"
            />
          ) : null}

          <Overlay category="tv" />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
