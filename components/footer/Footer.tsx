import Image from "next/image";
import styles from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.container}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <Image src="/culture.png" alt="Kangae" width={50} height={50} />
            <h2>Kangae</h2>
          </div>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In earum culpa impedit, voluptatum exercitationem voluptate blanditiis explicabo ab sed cum consectetur atque voluptas aspernatur architecto, mollitia iste velit fuga provident!
          </p>
          <div className={styles.icons}>
            <Image src="/facebook.png" alt="Facebook icon" width={18} height={18} />
            <Image src="/instagram.png" alt="Instagram icon" width={18} height={18} />
            <Image src="/youtube.png" alt="Youtube icon" width={18} height={18} />
          </div>
          <div className={styles.links}>
            <div className={styles.list}>
              <span className={styles.listTitle}>Links</span>
              <Link href="/">Homepage</Link>
              <Link href="/">About</Link>
              <Link href="/">Blog</Link>
            </div>
            <div className={styles.list}>
              <span className={styles.listTitle}>Tags</span>
              <Link href="/">Fashion</Link>
              <Link href="/">Style</Link>
              <Link href="/">Coding</Link>
              <Link href="/">Travel</Link>
            </div>
            <div className={styles.list}>
              <span className={styles.listTitle}>Social</span>
              <Link href="/">Facebook</Link>
              <Link href="/">Instagram</Link>
              <Link href="/">Youtube</Link>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer