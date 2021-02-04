import React from "react";

import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";


const theme = createMuiTheme({
});

const ThemeProvider = (props) => {
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
};

export default ThemeProvider;