import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"

type ThemeContextType = {
    isDarkMode: boolean,
    toggleSide: () => void,
    colorScheme: string,
}

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleSide: () => {},
    colorScheme: "light",
})

export const ThemeProvider = ({children}: {children: ReactNode}) => {

    const deviceColorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(deviceColorScheme === "dark");

    useEffect(() => {
        setIsDarkMode(deviceColorScheme === "dark");
    }, [deviceColorScheme])
    
    const toggleSide= () => {
        setIsDarkMode(!isDarkMode)
    }

    const colorScheme = isDarkMode ? "dark" : "light";

    const value = {
        isDarkMode,
        toggleSide,
        colorScheme
    }

    return <ThemeContext.Provider value={value}> {children} </ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within ThemeProvider")
    }
    return context;
}