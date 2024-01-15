import Menu from "@/components/menu/Menu"
import styles from "./singlePage.module.css"
import Image from "next/image"
import Comments from "@/components/comments/Comments"
import { getPostById } from "@/utils/getData"
import { IPostWithUser } from "@/@types/IPost"

const SinglePost = async ({params}: any) => {

    const { slug } = params;
    const data: IPostWithUser = await getPostById(slug);

    return (
    <main className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>
                    {data.title}
                </h1>
                <div className={styles.user}>
                    {data?.user?.image && (
                        <div className={styles.userImageContainer}>
                            <Image src={data.user.image} alt={`${data.user.image}'s image`} fill className={styles.image} />
                        </div>
                    )}
                    <div className={styles.userTextContainer}>
                        <span className={styles.username}>{data?.user.name}</span>
                        <span className={styles.date}>{data?.createdAt.substring(0, 10)}</span>
                    </div>
                </div>
            </div>

            {data.img && (
            <div className={styles.imageContainer}>
                <Image src={data.img} alt="Post image" fill className={styles.image} />
            </div>
            )}
        </div>
        <div className={styles.content}>
            <div className={styles.post}>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: data?.desc}} />


                <div className={styles.comment}>
                    <Comments slug={slug} />
                </div>
            </div>
            <Menu />
        </div>
    </main>
    )
}

export default SinglePost