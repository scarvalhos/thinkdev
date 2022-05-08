import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";

import {
    createContext,
    useState,
    useContext,
    useEffect,
} from "react";

import { LightTheme, DarkTheme } from '../styles/global';

type ThemeContextType = {
    theme: Theme;
    switchTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider({children}: any) {
    const [theme, setTheme] = useState(LightTheme)

    useEffect(() => {
        const themeStoraged = localStorage.getItem('theme')
        if(themeStoraged === 'dark') {
            setTheme(DarkTheme)
        } else if (themeStoraged === 'light') {
            setTheme(LightTheme)
        }
    }, [])

    const switchTheme = () => {
        if(theme === LightTheme) {
            setTheme(DarkTheme)
            localStorage.setItem('theme', 'dark')
        } else if (theme === DarkTheme) {
            setTheme(LightTheme)
            localStorage.setItem('theme', 'light')
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