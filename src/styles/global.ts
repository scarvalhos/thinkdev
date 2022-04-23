import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        light: '#FFFFFF',
        main: '#F70C61',
        dark: '#F5F5F5',
        contrastText: '#AAAAAA',
      },
      secondary: {
        light: '#FFFFFF',
        main: '#F70C61',
        dark: '#333333',
        contrastText: '#000000',
      },
    },
    typography: {
      fontFamily: 'Montserrat',
    }
});

export default theme;
