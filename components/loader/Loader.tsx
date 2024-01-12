import Image from "next/image";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
        <Image src="/loader.svg" alt="Loader" width={60} height={60} />
    </div>
  )
}

export default Loader