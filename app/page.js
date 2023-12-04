"use client";
import styles from "./page.module.css";

import { useEffect, useState } from "react";

export default function Home() {

  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    // Déclenchez l'impression après le rendu de la page
    fetch("/api/print", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Envoyez les données nécessaires pour l'impression
      body: JSON.stringify({
        /* vos données d'impression ici */
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.message);
          // Traitez le succès ici
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Une erreur est survenue, Veuillez réessayer " + JSON.stringify(error))
        // Traitez l'erreur ici
      });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Thermal printer</h1>
        <p>test printing on thermal printer</p>
        <div className={styles.card}>
          <h4>Token</h4>
          <h1>400</h1>
        </div>
        {error && <div style={{backgroundColor: 'red', color: 'white', padding: 10, borderRadius: 10, marginTop: 10}}><b>Erreur : {error}</b></div> }
      </div>
    </main>
  );
}
