import styled, { keyframes } from "styled-components";

export const LoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingMessage = styled.p`
  text-transform: capitalize;
`;
