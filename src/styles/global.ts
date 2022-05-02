import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        light: '#FFFFFF',
        main: '#F70C61',
        dark: '#F5F5F5',
        contrastText: '#AAAAAA',
      },
      secondary: {
        light: '#FFFFFF',
        main: '#F70C61',
        dark: '#DDDDDD',
        contrastText: '#000000',
      },
      background: {
        default: '#F5F5F5',

      },
    },
    typography: {
      fontFamily: 'Montserrat',
    },

});

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: '#151515',
      main: '#F70C61',
      dark: '#0c0c0c',
      contrastText: '#AAAAAA',
    },
    secondary: {
      light: '#FFFFFF',
      main: '#F70C61',
      dark: '#333333',
      contrastText: '#F5F5F5',
    },
    background: {
      default: '#0c0c0c',

    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },

});
