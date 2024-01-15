"use client"

import Link from "next/link";
import styles from "./authLinks.module.css"
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const AuthLinks = () => {

  const [open, setOpen] = useState(false)
  const { status } = useSession()

  function handleToggleOpen() {
    setOpen(!open)
  }

  const handleResize = useDebouncedCallback(() => {
    if(window.innerWidth >= 640) {
      setOpen(false);
    }
  }, 1000)

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  }, [])


  return (
    <>

      <Link className={styles.link} href="/about">About</Link>
      {status === "unauthenticated" ? (
        <Link className={styles.link} href="/login">Login</Link>
      ): (
        <>
        <Link className={styles.link} href="/create">Create</Link>
        <span className={styles.link} onClick={() => signOut()}>Logout</span>
        </>
      )}

      <div className={styles.burger} onClick={handleToggleOpen}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ): (
            <>
            <Link href="/create">Create</Link>
            <span className={styles.link} onClick={() => signOut()}>Logout</span>
            </>
          )}

        </div>
      )}
    </>
  )
}

export default AuthLinks