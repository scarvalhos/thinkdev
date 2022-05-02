import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";

import {
    createContext,
    useState,
    useContext,
} from "react";

import { LightTheme, DarkTheme } from '../styles/global';

type ThemeContextType = {
    theme: Theme;
    switchTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider({children}: any) {
    const [theme, setTheme] = useState(LightTheme)

    const switchTheme = () => {
        if(theme === LightTheme) {
            setTheme(DarkTheme)
        } else if (theme === DarkTheme) {
            setTheme(LightTheme)
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            <MuiThemeProvider theme={theme}>
                { children }
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export function useSwitchTheme() {
    return useContext(ThemeContext)
}    