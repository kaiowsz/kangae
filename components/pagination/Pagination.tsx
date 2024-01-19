"use client";

import { useRouter } from "next/navigation";
import styles from "./pagination.module.css"
import { useEffect } from "react";

const Pagination = ({page, hasNext, hasPrev}: any) => {
  
  const router = useRouter();


  function handleCurrentPage(state: "prev" | "next") {
    if(state === "prev") router.push(`?page=${page - 1}`)
    if(state === "next") router.push(`?page=${page + 1}`)
  }
  
  return (
    <div className={styles.container}>
      <button disabled={!hasPrev} className={styles.button} onClick={() => handleCurrentPage("prev")}>Previous</button>
      <button disabled={!hasNext} className={styles.button} onClick={() => handleCurrentPage("next")}>Next</button>
    </div>
  )
}

export default Pagination