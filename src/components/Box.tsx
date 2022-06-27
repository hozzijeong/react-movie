import { motion } from "framer-motion";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utility/utils";

const BoxContainer = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    // y: -80,
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

function Box({ data, category }: BoxInterface) {
  const nav = useNavigate();
  const curLoc = useLocation();
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const onBoxClicked = (dataId: number) => {
    nav(
      `${curLoc.pathname === "/" ? "movies" : curLoc.pathname}/${dataId}${
        keyword ? "?keyword=" + keyword : ""
      }`,
    );
  };
  return (
    <BoxContainer
      layoutId={data.id + ""}
      whileHover="hover"
      initial="normal"
      variants={boxVariants}
      transition={{ type: "tween" }}
      onClick={() => onBoxClicked(data.id)}
      bgPhoto={makeImagePath(
        data?.backdrop_path === null ? data?.poster_path : data?.backdrop_path,
        "w500",
      )}
    >
      <Info variants={infoVariants}>
        <h4>{category === "movies" ? data?.title : data?.name}</h4>
      </Info>
    </BoxContainer>
  );
}

export default Box;
