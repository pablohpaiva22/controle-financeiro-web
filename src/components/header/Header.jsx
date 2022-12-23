import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import styles from "./Header.module.scss";

function Header() {
  const { login, setLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    localStorage.clear();

    setLogin(false);
    navigate("/login");
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to='/'>
            <img src="../../src/assets/cifrao.png" alt="logo imagem de um cifrao" />
          </Link>
        </div>

        <nav className={styles.nav}>
          {login ? (
            <ul>
              <li>
                <NavLink
                  to="/minhaconta"
                  className={styles.link}
                  style={({ isActive }) =>
                    isActive ? { color: "#19880F" } : undefined
                  }
                >
                  Minha Conta
                </NavLink>
              </li>
              
              <li>
                <button className={styles.button} onClick={handleClick}>
                  Sair
                </button>
              </li>
            </ul>
          ) : (
            <NavLink
              to="/login"
              className={styles.link}
              style={({ isActive }) =>
                isActive ? { color: "#19880F" } : undefined
              }
            >
              Entrar
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
