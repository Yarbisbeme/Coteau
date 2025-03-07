import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"

type ThemeContextType = {
    isDarkMode: boolean,
    toggleSide: () => void,
    colorScheme: string,
    colors: {
        background: string,
        text: string,
        primary: string,
        notification: string
    }
}

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleSide: () => {},
    colorScheme: "light",
    colors: {
        background: "#FFFFFF",
        text: "#000000",
        primary: "#6200EE",
        notification: "#B00020"
    }
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const deviceColorScheme = useColorScheme()
    const [isDarkMode, setIsDarkMode] = useState(deviceColorScheme === "dark")

    useEffect(() => {
        setIsDarkMode(deviceColorScheme === "dark")
    }, [deviceColorScheme])

    const toggleSide = () => {
        setIsDarkMode(!isDarkMode)
    }

    const colorScheme = isDarkMode ? "dark" : "light"

    // 🎨 Define los colores dinámicos según el tema
    const colors = isDarkMode
        ? {
            background: "#121212",
            text: "#FFFFFF",
            primary: "#BB86FC",
            notification: "#CF6679"
        }
        : {
            background: "#FFFFFF",
            text: "#000000",
            primary: "#6200EE",
            notification: "#B00020"
        }

    const value = {
        isDarkMode,
        toggleSide,
        colorScheme,
        colors
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider")
    }
    return context
}
