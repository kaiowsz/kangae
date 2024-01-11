"use client"

import Link from "next/link";
import styles from "./authLinks.module.css"
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {

  const [open, setOpen] = useState(false)
  const { status } = useSession()

  return (
    <>
      {status === "unauthenticated" ? (
        <Link className={styles.link} href="/login">Login</Link>
      ): (
        <>
        <Link className={styles.link} href="/write">Write</Link>
        <span onClick={() => signOut}>Logout</span>
        </>
      )}

      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          {isAuthenticated ? (
            <Link href="/login">Login</Link>
          ): (
            <>
            <Link href="/write">Write</Link>
            <span>Logout</span>
            </>
          )}

        </div>
      )}
    </>
  )
}

export default AuthLinks