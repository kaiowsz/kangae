import Image from "next/image";
import styles from "./cardList.module.css";
import Card from "../card/Card";
import { getPosts } from "@/utils/getData";
import { IPost } from "@/@types/IPost";
import Pagination from "../pagination/Pagination";

const CardList = async ({page, category}: {page: number, category?: any}) => {

  const {posts, count}: {posts: IPost[], count: number} = await getPosts(page, category);

  const POST_PER_PAGE = 3;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Recent Posts</h2>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </section>
  )
}

export default CardList