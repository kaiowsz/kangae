import Image from "next/image"
import styles from "./card.module.css"
import Link from "next/link"
import { IPost } from "@/@types/IPost"

const Card = ({post}: {post: IPost}) => {
  return (
    <div className={styles.container}>
        {post.img && (
            <div className={styles.imageContainer}>
                <Image src={post.img} alt="Image" className={styles.image} fill />
            </div>
        )}
        <div className={styles.textContainer}>
            <div className={styles.detail}>
                <span className={styles.date}>{post.createdAt.substring(0, 10)} • </span>
                <span className={styles.category}>{post.catSlug}</span>
            </div>
            <Link href={`/posts/${post.slug}`}>
                <h2>{post.title}</h2>
            </Link>
            <div className={styles.description} dangerouslySetInnerHTML={{__html: post.desc.substring(0,100) + "..."}} />

            <Link className={styles.link} href={`/posts/${post.slug}`}>Read More</Link>
        </div>
    </div>
  )
}

export default Card