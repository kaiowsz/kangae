import Image from "next/image";
import styles from "./cardList.module.css";
import Card from "../card/Card";
import { getPosts } from "@/utils/getData";

const CardList = async ({page}: {page: number}) => {

  const data = await getPosts(page);

  console.log(data)
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Recent Posts</h2>
      <div className={styles.posts}>
        <Card />
      </div>
    </section>
  )
}

export default CardList