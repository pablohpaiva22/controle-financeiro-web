import React from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className={styles.container}>
      <h1>HOME</h1>

      <div className={styles.links}>
        <Link to="login">Login</Link>
        <Link to="cadastrar">SignUp</Link>
      </div>
    </section>
  );
}

export default Home;
