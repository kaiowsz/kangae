"use client"
import { signIn, useSession } from "next-auth/react"
import styles from "./login.module.css"
import { useRouter } from "next/navigation";

const Login = () => {

  const { data, status } = useSession();

  const router = useRouter();

  if(status === "loading") {
    return <div className={styles.loading}>Loading</div>
  } 
    

  if(status === "authenticated") {
    return router.push("/")
  }


  return (
    <main className={styles.container}>
        <div className={styles.wrapper}>
            <div onClick={() => signIn("google")} className={styles.socialButton}>Sign in with Google</div>
            <div className={styles.socialButton}>Sign in with Facebook</div>
            <div className={styles.socialButton}>Sign in with Github</div>
        </div>
    </main>
  )
}

export default Login