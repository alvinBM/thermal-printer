import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Thermal printer</h1>
        <p>test printing on thermal printer</p>
        <div className={styles.card}>
          <h4>Token</h4>
          <h1>400</h1>
        </div>
      </div>
    </main>
  );
}
