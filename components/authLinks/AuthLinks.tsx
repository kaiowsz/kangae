"use client"

import Link from "next/link";
import styles from "./authLinks.module.css"
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {

  const [open, setOpen] = useState(false)
  const { status } = useSession()

  function handleToggleOpen() {
    console.log(window.innerWidth)
  }

  function handleResize() {
    let timer;

    clearTimeout(timer);


    timer = setTimeout(() => {
      console.log(window.innerWidth)
    }, 1000)

    
  }

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