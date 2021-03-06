import { AnimatePresence, useViewportScroll } from "framer-motion";
import { setLogger, useQuery } from "react-query";
import {
  PathMatch,
  useMatch,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  getMovieDetail,
  getTvDetail,
  MovieDetailInterface,
  TvDetailInterface,
} from "../api/api";
import MovieDetail from "./MovieDetail";
import { BigContent, OverlayContainer, Loader } from "./Styled";
import TvDetail from "./TvDetail";

interface OverlayInterface {
  category: string;
}

export function Overlay({ category }: OverlayInterface) {
  const { scrollY } = useViewportScroll();
  const nav = useNavigate();
  const curLoc = useLocation();
  const path = curLoc.pathname.split("/")[1];
  const onOverlayClick = () =>
    nav(`/${path === "movies" ? "" : path}${curLoc.search}`);
  const searchPathMatch: PathMatch<string> | null = useMatch(
    `${path === "" ? "movies" : path}/:id`,
  );

  const id = Number(searchPathMatch?.params.id);

  const getContentData = (id: number) =>
    !Number.isNaN(id)
      ? category === "movies"
        ? getMovieDetail(id)
        : getTvDetail(id)
      : null;

  const { data, isLoading, isSuccess } = useQuery<
    MovieDetailInterface | TvDetailInterface | null
  >(["overlay", id], () => getContentData(id), {
    retry: !isNaN(id),
    onError: (e) => failFetch("Error Occure!"),
  });

  const failFetch = (message: string) => {
    alert(message);
    onOverlayClick();
  };

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <AnimatePresence>
          {searchPathMatch && isSuccess ? (
            <>
              <OverlayContainer
                onClick={onOverlayClick}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <BigContent
                style={{ top: scrollY.get() + 100 }}
                layoutId={id + ""}
              >
                {category === "movies" ? (
                  <MovieDetail content={data as MovieDetailInterface} />
                ) : (
                  <TvDetail content={data as TvDetailInterface} />
                )}
              </BigContent>
            </>
          ) : null}
        </AnimatePresence>
      )}
    </>
  );
}
