import styles from "./blog.module.css"
import Menu from "@/components/menu/Menu"
import CardList from "@/components/cardList/CardList"

const Blog = ({searchParams}: any) => {

  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{cat} Posts</h1>
      <div className={styles.content}>
        <CardList page={page} category={cat} />
        <Menu />
      </div>
    </main>
  )
}

export default Blog