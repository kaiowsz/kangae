import Image from "next/image"
import styles from "./header.module.css"
import Link from "next/link"
import ThemeToggle from "../themeToggle/ThemeToggle"
import AuthLinks from "../authLinks/AuthLinks"

const Header = () => {

  return (
    <header className={styles.container}>
      <div className={styles.social}>
        <Image src="/facebook.png" alt="Facebook" width={24} height={24} />
        <Image src="/youtube.png" alt="Youtube" width={24} height={24} />
        <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
      </div>
      <div className={styles.logo}>kangae</div>
      <div className={styles.links}>
        <ThemeToggle />

        <Link className={styles.link} href="/">Homepage</Link>
        <Link className={styles.link} href="/about">About</Link>
        <Link className={styles.link} href="/login">Login</Link>

        <AuthLinks />
      </div>
    </header>
  )
}

export default Header