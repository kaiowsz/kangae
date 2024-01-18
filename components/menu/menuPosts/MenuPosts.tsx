import Link from "next/link"
import Image from "next/image"
import styles from "./menuPosts.module.css"
import { IPost } from "@/@types/IPost";

interface MenuPostsProps {
  withImage: boolean;
  popularPosts?: IPost[];
}

const MenuPosts = ({withImage, popularPosts}: MenuPostsProps) => {
    return (
        <div className={styles.items}>

          {popularPosts?.map(popPost => (
              <Link href={`/posts/${popPost.slug}`} className={styles.item}>
                {popPost.img && (
                  <div className={styles.imageContainer}>
                    <Image src={popPost.img} alt="" fill className={styles.image} />
                  </div>
                )}
                <div className={styles.textContainer}>
                  <span className={`${styles.category} ${styles.travel}`}>{popPost.catSlug}</span>
                  <h3 className={styles.postTitle}>
                    {popPost.title}
                  </h3>
                  <div className={styles.detail}>
                    <span className={styles.username}>{popPost.views} Views</span>
                    <span className={styles.date}> • {popPost.createdAt.substring(0, 10)}</span>
                  </div>
                </div>
              </Link>
            ))}

            {!popularPosts && (
            <>
              <Link href="/" className={styles.item}>
                {withImage && (
                  <div className={styles.imageContainer}>
                    <Image src="/p1.jpeg" alt="" fill className={styles.image} />
                  </div>
                )}
                <div className={styles.textContainer}>
                  <span className={`${styles.category} ${styles.culture}`}>
                    Culture
                  </span>
                  <h3 className={styles.postTitle}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <div className={styles.detail}>
                    <span className={styles.username}>John Doe</span>
                    <span className={styles.date}> - 10.03.2023</span>
                  </div>
                </div>
              </Link>
              <Link href="/" className={styles.item}>
                {withImage && (
                  <div className={styles.imageContainer}>
                    <Image src="/p1.jpeg" alt="" fill className={styles.image} />
                  </div>
                )}
                <div className={styles.textContainer}>
                  <span className={`${styles.category} ${styles.food}`}>Food</span>
                  <h3 className={styles.postTitle}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <div className={styles.detail}>
                    <span className={styles.username}>John Doe</span>
                    <span className={styles.date}> - 10.03.2023</span>
                  </div>
                </div>
              </Link>
              <Link href="/" className={styles.item}>
                {withImage && (
                  <div className={styles.imageContainer}>
                    <Image src="/p1.jpeg" alt="" fill className={styles.image} />
                  </div>
                )}
                <div className={styles.textContainer}>
                  <span className={`${styles.category} ${styles.fashion}`}>
                    Fashion
                  </span>
                  <h3 className={styles.postTitle}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <div className={styles.detail}>
                    <span className={styles.username}>John Doe</span>
                    <span className={styles.date}> - 10.03.2023</span>
                  </div>
                </div>
              </Link>
            </>
          )}

        </div>
      );
}

export default MenuPosts