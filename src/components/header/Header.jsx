import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <Link className={styles.logo} to="/">
            Logo
          </Link>
        </div>

        <nav>
          <div>
            <NavLink
              to="/login"
              className={styles.link}
              style={({ isActive }) =>
                isActive ? {color: 'rgb(255, 110, 43)'} : undefined
              }
            >
              Entrar
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
