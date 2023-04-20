import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const primaryColor = "#84cdcb";
const secondaryColor = "#cd8484";
const tertiaryColor = "#cbcd84";
const textColor = "#333333";
const textColor2 = "#FFFFFF"

let theme = createTheme({
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
    alternate: {
      main: "#E27D60",
    },
    text: {
      primary: textColor,
      secondary: textColor2,
    },
  },
 breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

theme = responsiveFontSizes(theme)

export default theme;
