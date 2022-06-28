import { AnimatePresence, useViewportScroll } from "framer-motion";
import {
  PathMatch,
  useMatch,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Movie, TvShow } from "../api/api";
import { makeImagePath } from "../utility/utils";
import {
  BigCover,
  BigMovie,
  BigOverview,
  BigTitle,
  OverlayContainer,
} from "./Styled";

export function Overlay({ curContent }: any) {
  const { scrollY } = useViewportScroll();
  const nav = useNavigate();
  const curLoc = useLocation();
  const path = curLoc.pathname.split("/")[1];
  const onOverlayClick = () =>
    nav(`/${path === "movies" ? "" : path}${curLoc.search}`);
  const searchPathMatch: PathMatch<string> | null = useMatch(
    `${path === "" ? "movies" : path}/:id`,
  );

  const clickedContent = (results: any[] | null) => {
    if (searchPathMatch?.params.id && results) {
      return results?.find(
        (data: Movie | TvShow) => data.id + "" === searchPathMatch.params.id,
      );
    } else return null;
  };

  return (
    <AnimatePresence>
      {searchPathMatch ? (
        <>
          <OverlayContainer
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={searchPathMatch.params.id}
          >
            {clickedContent(curContent) && (
              <div style={{ position: "relative" }}>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedContent(curContent)?.backdrop_path,
                      "w500",
                    )})`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    height: "400px",
                    width: "100%",
                  }}
                >
                  <BigTitle>
                    {clickedContent(curContent)?.title
                      ? clickedContent(curContent)?.title
                      : clickedContent(curContent)?.name}
                  </BigTitle>
                </div>
                <BigOverview>
                  {clickedContent(curContent)?.overview}
                </BigOverview>
              </div>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
}
