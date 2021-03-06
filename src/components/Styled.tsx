import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  background: black;
  padding-botom: 200px;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export const CategoryTitle = styled.h1`
  font-size: 48px;
  margin: 20px 0 20px 60px;
  font-weight: bold;
`;

export const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

export const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

export const OverlayContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const BigContent = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: auto;
  min-height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.veryDark};
`;

export const BigCover = styled.div<{ imagePath: string }>`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.imagePath});
`;

export const BigTitle = styled.div`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: absolute;
  font-weight: bold;
  bottom: 0;
`;

export const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  h1 {
    font-size: 48px;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 5px;
  }
`;

export const TitleDiv = styled.div`
  position: absolute;
  top: 0;
  height: 400px;
  width: 100%;
`;

export const Relative = styled.div`
  position: sticky;
  top: 20px;
`;

export const InfoDiv = styled.div`
  padding: 20px;
  position: relative;
  p {
    font-size: 18px;
    line-height: initial;
    span {
      font-weight: bold;
    }
  }
`;
