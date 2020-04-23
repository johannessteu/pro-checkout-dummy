import * as React from "react";
import { render } from "react-dom";
import { GlobalStyle } from "@t3n/components";
import { theme } from "@t3n/theme";
import { ThemeProvider } from "styled-components";

import App from "./App";

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <App />
      </>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
render(<Root />, rootElement);
