import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import "@fontsource/roboto";
import "@fontsource/jetbrains-mono";

import App from "./App";

import {registerSW} from "virtual:pwa-register";
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";

const updateSW = registerSW({
  onOfflineReady() {
  },
});

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
