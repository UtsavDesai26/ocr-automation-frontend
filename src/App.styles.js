import { styled } from "styled-components";

export const LoaderWrapper = styled.div`
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  z-index: 100;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
