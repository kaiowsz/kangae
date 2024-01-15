import Link from "next/link"
import styles from "./categoryList.module.css"
import Image from "next/image"
import { ICategory } from "@/@types/ICategory"
import { getCategories } from "@/utils/getData"

const CategoryList = async () => {

  const data = await getCategories();

  console.log(data);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Popular Categories</h2>
      <ul className={styles.categories}>

        {data && data?.map((category: ICategory) => (
          <li className={styles.categoryWrapper} key={category._id}>
            <Link href={`/blog?cat=${category.slug}`} className={`${styles.category} ${styles[category.slug]}`}>
              <Image src={category.img || "/culture.png"} alt={`${category.title} image`} width={32} height={32} className={styles.image} />
              {category.title}
            </Link>
          </li>
        ))}

      </ul>
    </section>
  )
}

export default CategoryList