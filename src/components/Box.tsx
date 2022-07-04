import { motion } from "framer-motion";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Genres } from "../api/api";
import { movieGenre, tvGenre } from "../atom";
import { makeImagePath } from "../utility/utils";

const BoxContainer = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  position:relative &:nth-child(6n) {
    transform-origin: center right;
  }
  &:nth-child(6n + 1) {
    transform-origin: center left;
  }
`;
const Info = styled(motion.div)`
  padding: 15px;
  background-color: ${(props) => props.theme.black.veryDark};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: -45px;
  h3 {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    text-overflow: ellipsis2;
  }

  h6 {
    margin-top: 10px;
    text-align: left;
    font-size: 14px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    cursor: "pointer",
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

interface BoxInterface {
  data: any;
  category: string;
}

const returnCategory = (category: string) =>
  category === "movies" ? movieGenre : tvGenre;

const findGenres = (x: number, contentGenres: Genres[]) =>
  contentGenres?.find((ele) => ele.id === x)?.name;

const returnPathName = (pathName: string) =>
  pathName === "/" ? "movies" : pathName;

const returnKeyWord = (keyword: string) =>
  keyword ? "?keyword=" + keyword : "";

function Box({ data, category }: BoxInterface) {
  const nav = useNavigate();
  const curLoc = useLocation();
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const onBoxClicked = (dataId: number) => {
    nav(
      `${returnPathName(curLoc.pathname)}/${dataId}${returnKeyWord(
        keyword as string,
      )}`,
    );
  };

  const contentGenres = useRecoilValue(returnCategory(category));

  const genreArr = data.genre_ids.map((x: number) =>
    findGenres(x, contentGenres),
  );
  return (
    <>
      <BoxContainer
        layoutId={data.id + ""}
        whileHover="hover"
        initial="normal"
        variants={boxVariants}
        transition={{ type: "tween" }}
        onClick={() => onBoxClicked(data.id)}
        bgPhoto={makeImagePath(data?.backdrop_path, "w500")}
      >
        <Info variants={infoVariants}>
          <h3>{category === "movies" ? data.title : data.name}</h3>
          <h6>Genres:{genreArr.map((x: string) => x + " ")}</h6>
        </Info>
      </BoxContainer>
    </>
  );
}

export default Box;
