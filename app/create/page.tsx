"use client"

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"
import Image from "next/image";
import styles from "./create.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/loader/Loader";
import Link from "next/link";

import { v4 as uuidv4 } from "uuid"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import toast from "react-hot-toast";
const storage = getStorage(app);

const Create = () => {

    const [file, setFile] = useState<null | File>(null)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [media, setMedia] = useState("")
    const [title, setTitle] = useState("")
    const [catSlug, setCatSlug] = useState("")
    const [isPublishing, setIsPublishing] = useState(false);

    /** This function create a slug based on the title received. The slug is required to save in the database, serving as a unique ID. */
    function slugify(title: string) {
        let slug = title.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")

        let uniqueID = uuidv4();

        return `${slug}-${uniqueID.substring(0,8)}`;
    }

    async function uploadPostWithImage() {
        if(!file) {
            setIsPublishing(false)
            return;
        }

        const name = file.name;
        const storageRef = ref(storage, name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done.`)
        }, (error: any) => {
            console.log("Unable to upload the file.")
            toast.error(error);
            setIsPublishing(false);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL: string) => {
                const res = await fetch(`/api/posts`, {
                    method: "POST",
                    body: JSON.stringify({
                        title,
                        desc: value,
                        img: downloadURL,
                        slug: slugify(title),
                        catSlug: catSlug || "coding"
                    })
                });

                if(res.ok) toast.success("Post created successfully.")
                if(!res.ok) toast.error("Could not create post. Please, try again.")

                setIsPublishing(false);
            })
        }
        )
    }

    async function handleSubmit() {
        setIsPublishing(true);

        if(file) {
            await uploadPostWithImage();
            return;
        }
        
        const res = await fetch(`/api/posts`, {
            method: "POST",
            body: JSON.stringify({
                title,
                desc: value,
                img: media,
                slug: slugify(title),
                catSlug: catSlug || "coding"
            })
        });

        if(res.ok) toast.success("Post created successfully")

        setIsPublishing(false);
    }

    function handleChangeFile(event: ChangeEvent<HTMLInputElement>) {
        if(event.target.files) {
            setFile((event.target.files[0]))
        }
    }

    // const { status } = useSession();

    // if(status === "loading") {
    //     return <Loader />
    // }

    // if(status === "unauthenticated") {
    //     return (
    //         <main className={styles.container_unauth}>
    //             <h1>You need to be logged in to create posts. <Link className={styles.link_unauth} href="/login">Log in</Link></h1>
    //         </main>
    //     )
    // }

    return (
    <main className={styles.container}>
        <input type="text" placeholder="Title" className={styles.input} onChange={e => setTitle(e.target.value)} value={title} />

        <select className={styles.select} onChange={event => setCatSlug(event.target.value)}>
            <option value="style">Style</option>
            <option value="fashion">Fashion</option>
            <option value="food">Food</option>
            <option value="culture">Culture</option>
            <option value="travel">Travel</option>
            <option value="Coding">Coding</option>
        </select>

        <div className={styles.custom_select}>
            <button className={styles.select_button}>
                <span className={styles.selected_value}>Open this select menu</span>
                <span className={styles.arrow}></span>
            </button>
            <ul className={styles.select_dropdown}>
                <li>
                    <input type="text" />
                    <label htmlFor=""></label>
                </li>
                <li>
                    <input type="text" />
                    <label htmlFor=""></label>
                </li>
                <li>
                    <input type="text" />
                    <label htmlFor=""></label>
                </li>
                <li>
                    <input type="text" />
                    <label htmlFor=""></label>
                </li>
                <li>
                    <input type="text" />
                    <label htmlFor=""></label>
                </li>
                <li>
                    <input type="text" />
                    <label htmlFor=""></label>
                </li>
            </ul>
        </div>

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
        <button className={`${styles.publish} ${isPublishing && styles.publishing}`} onClick={handleSubmit}>{isPublishing ? "Publishing..." : "Publish"}</button>
    </main>
    )
}

export default Create