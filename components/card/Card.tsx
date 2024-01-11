import Image from "next/image"
import styles from "./card.module.css"
import Link from "next/link"

const Card = () => {
  return (
    <div className={styles.container}>
        <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="Image" className={styles.image} fill />
        </div>
        <div className={styles.textContainer}>
            <div className={styles.detail}>
                <span className={styles.date}>11.02.2023 • </span>
                <span className={styles.category}>CULTURE</span>
            </div>
            <Link href="/">
                <h2>Lorem ipsum dolor sit amet consectur.</h2>
            </Link>
            <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis sapiente vitae architecto eveniet vel rerum, sunt voluptate modi officia ratione quia, optio qui nobis eius ullam, unde quam ipsum eaque.</p>
            <Link className={styles.link} href="/">Read More</Link>
        </div>
    </div>
  )
}

export default Card