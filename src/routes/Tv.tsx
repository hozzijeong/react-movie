import { useQuery } from "react-query";
import { GetTvList, getTVShow, TvShow } from "../api/api";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import { makeImagePath, sliceArr } from "../utility/utils";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import { useRecoilValue } from "recoil";
import { curTvData } from "../atom";
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

  const nav = useNavigate();

  const curTv = useRecoilValue(curTvData);
  const tvPathMatch: PathMatch<string> | null = useMatch("/tv/:id");

  const { scrollY } = useViewportScroll();

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

  const onOverlayClick = () => {
    console.log(tvPathMatch);
    nav("/tv");
  };

  const clickeTv = (results: TvShow[] | null) => {
    if (tvPathMatch?.params.id) {
      return results?.find((tv) => tv.id + "" === tvPathMatch.params.id);
    } else return null;
  };

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

          <AnimatePresence>
            {tvPathMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={tvPathMatch.params.id}
                >
                  {clickeTv(curTv) && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickeTv(curTv)?.backdrop_path as string,
                            "w500",
                          )})`,
                        }}
                      />
                      <BigTitle>{clickeTv(curTv)?.name}</BigTitle>
                      <BigOverview>
                        {clickeTv(curTv)?.overview === ""
                          ? "there is no OverView"
                          : clickeTv(curTv)?.overview}
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

export default Tv;
