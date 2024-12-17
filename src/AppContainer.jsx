import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import GlobalStyles from "@styles/Global";
import App from "./App";
import { ThemeProvider } from "styled-components";
import Theme from "@styles/Theme";

const AppContainer = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Poppins",
            },
          }}
        >
          <GlobalStyles />
          <App />
        </ConfigProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default AppContainer;
