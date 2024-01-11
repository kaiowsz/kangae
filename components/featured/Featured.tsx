import Image from "next/image";
import styles from "./featured.module.css";

const Featured = () => {
  return (
    <section className={styles.container}>
        <h1 className={styles.title}>
          Welcome to <strong>Kangae!</strong> Here, you can discover stories and share yours.
        </h1>
        <div className={styles.post}>
          <div className={styles.imgContainer}>
            <Image src="/p1.jpeg" alt="Banner" className={styles.image} fill />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
            <p className={styles.postDescription}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nemo in non ipsam dolorem, dolorum animi itaque quisquam labore blanditiis? Quam saepe, sint iure in fuga adipisci consequatur beatae ratione?</p>
            <button className={styles.button}>Read More</button>
          </div>
        </div>
    </section>
  )
}

export default Featured