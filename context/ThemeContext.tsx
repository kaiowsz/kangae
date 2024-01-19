"use client";

import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext<any>({
    theme: "light",
    toggleTheme: () => null
});

export const ThemeContextProvider = ({children}: {children: React.ReactNode}) => {

    const [theme, setTheme] = useState(() => {return getThemeFromLocalStorage()});

    function getThemeFromLocalStorage() {
        
        // verify if it's client component
        if(typeof window !== "undefined") { 
            const value = localStorage.getItem("theme");
            return value || "light";
        } else {
            return "light";
        }
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    useEffect(() => {
      localStorage.setItem("theme", theme);
    }, [theme])
    

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}