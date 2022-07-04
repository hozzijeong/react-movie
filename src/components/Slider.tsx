import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Box from "./Box";
import { CategoryTitle } from "./Styled";

const SliderContainer = styled.div`
  position: relative;
  top: -100px;
  height: 300px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
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
  title: string;
  category: string;
}

function Slider({ results, toggleLeaving, index, title, category }: ISlider) {
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
