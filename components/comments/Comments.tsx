"use client";

import Link from "next/link";
import styles from "./comments.module.css"
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Loader from "../loader/Loader";
import { IComment } from "@/@types/IComment";
import { useState } from "react";
import toast from "react-hot-toast";

const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json();

    console.log(data, url);

    if(!res.ok) {
        const error = new Error(data.message)
        throw error;
    }

    return data;
}

const Comments = ({slug}: any) => {
    const { status } = useSession();

    const url = `${process.env.API_URL}/api/comments?postSlug=${slug}`

    const { data, mutate, isLoading }: {data: IComment[], isLoading: boolean, mutate: () => void} = useSWR(url, async(url) => {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    });
    

    const [desc, setDesc] = useState("")

    async function handleSubmit() {
        if(!desc || desc.trim() === "") return toast.error("Comment must not be empty.");


        await fetch(`/api/comments`, {
            method: "POST",
            body: JSON.stringify({desc, postSlug: slug})
        })

        mutate()
        setDesc("")
        toast.success("Comment created successfully.")
    }

    return (
    <section className={styles.container}>
        <h2 className={styles.title}>Comments</h2>
        {status === "authenticated" ? (
            <div className={styles.write}>
                <textarea 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)} 
                className={styles.input} 
                placeholder="Write a comment..." 
                cols={30} 
                rows={10}/>
                <button onClick={handleSubmit} className={`${styles.button}`} disabled={!desc}>Submit</button>
            </div>
        ): (
            <Link href="/login">Login to write a comment</Link>
        )}

        <div className={styles.comments}>
            {isLoading ? <Loader /> : data && data.map((comment: any) => (
                <div className={styles.comment} key={comment._id}>
                    <div className={styles.user}>
                        <Image src={comment.user.image} className={styles.image} alt={`${comment.user.image}'s  image`} width={50} height={50} />
                        <div className={styles.userInfo}>
                            <span className={styles.username}>{comment.user.name}</span>
                            <span className={styles.date}>{comment.createdAt.substring(0, 10)}</span>
                        </div>
                    </div>

                    <p className={styles.description}>
                        {comment.desc}
                    </p>
                </div>
            ))}
        </div>
    </section>
    )
}

export default Comments