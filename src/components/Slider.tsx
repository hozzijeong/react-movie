import { AnimatePresence, motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { curMovieData, curTvData } from "../atom";
import Box from "./Box";
import { CategoryTitle } from "./Styled";

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

interface ISlider {
  results: any[] | null;
  toggleLeaving?: () => void;
  index: number;
  // offset: number;
  title: string;
  category: string;
}

function Slider({
  results,
  toggleLeaving,
  index,
  // offset,
  title,
  category,
}: ISlider) {
  const setMovieData = useSetRecoilState(curMovieData);
  const setTvData = useSetRecoilState(curTvData);

  return (
    <SliderContainer>
      <CategoryTitle>{title}</CategoryTitle>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          onHoverStart={() =>
            category === "movies" ? setMovieData(results) : setTvData(results)
          }
          key={index}
        >
          {results?.map((data) => (
            <Box key={data.id} data={data} category={category} />
          ))}
        </Row>
      </AnimatePresence>
    </SliderContainer>
  );
}
export default Slider;
