"use client"

import { ThemeContextProvider, ThemeContext } from "@/context/ThemeContext"
import { useContext, useEffect, useState } from "react"

const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const { theme } = useContext(ThemeContext)
    const [ mounted, setMounted ] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true);
    }, [])

    if(mounted) {
        return (
            <div className={theme}>
                {children}
            </div>
        )
    }
}

export default ThemeProvider