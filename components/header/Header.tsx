import Image from "next/image"
import styles from "./header.module.css"
import Link from "next/link"
import ThemeToggle from "../themeToggle/ThemeToggle"
import AuthLinks from "../authLinks/AuthLinks"

const Header = () => {

  return (
    <header className={styles.container}>
      <Link href="/" className={styles.logo}>kangae</Link>
      <div className={styles.links}>
        <ThemeToggle />

        {/* <Link className={styles.link} href="/about">About</Link> */}

        <AuthLinks />
      </div>
    </header>
  )
}

export default Header