import React from "react";
import { Spin } from "antd";
import { LoaderWrapper, LoadingMessage } from "./Loader.styles";

const Loader = ({ message }) => {
  return (
    <LoaderWrapper>
      <Spin />
      {message && <LoadingMessage>{message}</LoadingMessage>}
    </LoaderWrapper>
  );
};

export default Loader;
