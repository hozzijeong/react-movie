import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { GetMovieList, Movie } from "../api/api";
import { curMovieData } from "../atom";
import { makeImagePath } from "../utility/utils";

const Title = styled.h1`
  font-size: 48px;
  margin: 20px 0 20px 60px;
  font-weight: bold;
`;

const SliderContainer = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: relative;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
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
const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
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

interface ISlider {
  results: Movie[] | null;
  toggleLeaving: () => void;
  index: number;
  offset: number;
  title: string;
}

function Slider({ results, toggleLeaving, index, offset, title }: ISlider) {
  const nav = useNavigate();

  // const onlyBackdropPath = (movies: Movie[] | undefined) => {
  //   if (movies?.length) {
  //     const copy = { ...movies };
  //     copy.map((movie, index) => {
  //       if (movie.backdrop_path === null) {
  //         return copy.splice(index, 1);
  //       }
  //     });
  //     return copy;
  //   } else return null;
  // };
  const onBoxClicked = (movieId: number) => {
    nav(`/movies/${movieId}`);
  };
  const setMovieData = useSetRecoilState(curMovieData);

  return (
    <SliderContainer>
      <Title>{title}</Title>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          onHoverStart={() => setMovieData(results)}
          // onHoverEnd={() => setMovieData(null)}
          key={index}
        >
          {results
            ?.slice(1)
            .slice(offset * index, offset * index + offset)
            .map((data) => (
              <Box
                key={data.id}
                layoutId={data.id + ""}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                transition={{ type: "tween" }}
                onClick={() => onBoxClicked(data.id)}
                bgPhoto={makeImagePath(data.backdrop_path, "w500")}
              >
                <Info variants={infoVariants}>
                  <h4>{data.title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </SliderContainer>
  );
}
export default Slider;
