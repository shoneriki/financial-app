import { createTheme } from "@mui/material/styles";

const primaryColor = "#84cdcb";
const secondaryColor = "#cd8484";
const tertiaryColor = "#cbcd84";
const textColor = "#333333";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    tertiary: {
      main: tertiaryColor,
    },
    text: {
      primary: textColor,
    },
  },
});

export default theme;
