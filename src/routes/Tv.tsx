import { useQuery } from "react-query";
import { GetTvList, getTVShow, TvShow } from "../api/api";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { makeImagePath } from "../utility/utils";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import { useRecoilValue } from "recoil";
import { curTvData } from "../atom";

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

  console.log(latest);

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
              results={airingToday?.results}
              toggleLeaving={toggleLeaving}
              index={index}
              offset={offset}
              title="Airing Today"
              category="tv"
            />
          ) : null}

          {topRated?.results ? (
            <Slider
              results={topRated?.results}
              toggleLeaving={toggleLeaving}
              index={index}
              offset={offset}
              title="Top Rated"
              category="tv"
            />
          ) : null}

          {popular?.results ? (
            <Slider
              results={popular?.results}
              toggleLeaving={toggleLeaving}
              index={index}
              offset={offset}
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
