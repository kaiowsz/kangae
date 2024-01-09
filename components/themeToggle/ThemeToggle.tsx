"use client"

import Image from "next/image"
import styles from "./themeToggle.module.css"
import { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"

const ThemeToggle = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div 
    style={theme === "dark" ? 
      { background: "white" }: 
      { background: "#0f172a" }
    } 
    className={styles.container} 
    onClick={toggleTheme}>
        <Image src="/moon.png" alt="Dark theme" width={14} height={14} />
        <div className={styles.ball} 
        style={theme === "dark" ?
        { left: 1, backgroundColor: "#0f172a" } : 
        { right: 1, backgroundColor: "white" }
        }/>
        <Image src="/sun.png" alt="Light theme" width={14} height={14} />
    </div>
  )
}

export default ThemeToggle