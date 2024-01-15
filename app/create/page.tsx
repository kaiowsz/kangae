"use client"

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"
import Image from "next/image";
import styles from "./create.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import Link from "next/link";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";

const storage = getStorage(app);

const Create = () => {

    const [file, setFile] = useState<null | string | object>(null)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [media, setMedia] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        const upload = () => {
            const name = new Date().getTime + (file as any).name
            const storageRef = ref(storage, name)

            const uploadTask = uploadBytesResumable(storageRef, (file as any));

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                switch(snapshot.state) {
                    case "paused":
                        console.log("Upload is paused")
                        break;
                    case "running": 
                        console.log("Upload is running")
                        break;
                }
            }, (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
                    setMedia(downloadURL)
                })
            }
            
            )
        }

        file && upload();
    }, [file])

    function slugify(title: string) {
        return title.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    }

    async function handleSubmit() {
        const res = await fetch(`/api/posts`, {
            method: "POST",
            body: JSON.stringify({
                title,
                desc: value,
                img: media,
                slug: slugify(title),
                catSlug: "coding"
            })
        })

        console.log(res)
    }

    function handleChangeFile(event: ChangeEvent<HTMLInputElement>) {
        if(event.target.files) {
            setFile((event.target.files[0]))
        }
    }

    const { status } = useSession();

    const router = useRouter();

    if(status === "loading") {
        return <Loader />
    }

    if(status === "unauthenticated") {
        return (
            <main className={styles.container_unauth}>
                <h1>You need to be logged in to create posts. <Link className={styles.link_unauth} href="/login">Log in</Link></h1>
            </main>
        )
    }

    return (
    <main className={styles.container}>
        <input type="text" placeholder="Title" className={styles.input} onChange={e => setTitle(e.target.value)} value={title} />

        {/* <input type="text" placeholder="Category" /> */}

        <div className={styles.editor}>
            <button className={styles.button} onClick={() => setOpen(!open)}>
                <Image src="/plus.png" alt="" width={16} height={16} />
            </button>
            {open && (
                <div className={styles.add}>
                    <input type="file" id="image" onChange={handleChangeFile} style={{display: "none"}} />

                    <button className={styles.addButton}>
                        <label htmlFor="image">
                            <Image src="/image.png" alt="Add image" width={16} height={16}  />
                        </label>
                    </button>

                    <button className={styles.addButton}>
                        <Image src="/external.png" alt="Add external" width={16} height={16}  />
                    </button>
                    <button className={styles.addButton}>
                        <Image src="/video.png" alt="Add video" width={16} height={16}  />
                    </button>
                </div>
            )}

            <ReactQuill className={styles.textArea} theme="bubble" value={value} onChange={setValue} placeholder="Tell your story..."  />
        </div>
        <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </main>
    )
}

export default Create