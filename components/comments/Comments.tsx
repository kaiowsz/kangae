import Link from "next/link";
import styles from "./comments.module.css"
import Image from "next/image";

const Comments = () => {

    const isAuthenticated = true;

    return (
    <section className={styles.container}>
        <h2 className={styles.title}>Comments</h2>
        {isAuthenticated ? (
            <div className={styles.write}>
                <textarea className={styles.input} placeholder="Write a comment..." name="" id="" cols={30} rows={10}></textarea>
                <button className={styles.button}>Submit</button>
            </div>
        ): (
            <Link href="/login">Login to write a comment</Link>
        )}

        <div className={styles.comments}>

            <div className={styles.comment}>
                <div className={styles.user}>
                    <Image src="/p1.jpeg" className={styles.image} alt="User image" width={50} height={50} />
                    <div className={styles.userInfo}>
                        <span className={styles.username}>John Doe</span>
                        <span className={styles.date}>11.01.2024</span>
                    </div>
                </div>

                <p className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque laudantium, voluptatibus sequi aliquid ea dolorum eum magnam nam quae, doloremque beatae minus omnis facilis placeat ratione, tempora corporis! Mollitia.
                </p>
            </div>

            <div className={styles.comment}>
                <div className={styles.user}>
                    <Image src="/p1.jpeg" className={styles.image} alt="User image" width={50} height={50} />
                    <div className={styles.userInfo}>
                        <span className={styles.username}>John Doe</span>
                        <span className={styles.date}>11.01.2024</span>
                    </div>
                </div>

                <p className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque laudantium, voluptatibus sequi aliquid ea dolorum eum magnam nam quae, doloremque beatae minus omnis facilis placeat ratione, tempora corporis! Mollitia.
                </p>
            </div>

            <div className={styles.comment}>
                <div className={styles.user}>
                    <Image src="/p1.jpeg" className={styles.image} alt="User image" width={50} height={50} />
                    <div className={styles.userInfo}>
                        <span className={styles.username}>John Doe</span>
                        <span className={styles.date}>11.01.2024</span>
                    </div>
                </div>

                <p className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque laudantium, voluptatibus sequi aliquid ea dolorum eum magnam nam quae, doloremque beatae minus omnis facilis placeat ratione, tempora corporis! Mollitia.
                </p>
            </div>

        </div>

    </section>
    )
}

export default Comments