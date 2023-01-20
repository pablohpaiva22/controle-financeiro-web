import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import styles from "./Header.module.scss";

function Header() {
  const { login, setLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  function handleClick(e) {
    e.preventDefault();
    localStorage.clear();

    setLogin(false);
    navigate("/");
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={"../../src/assets/cifrao.png"}
              alt="logo imagem de um cifrao"
            />
          </Link>
        </div>

        <nav className={styles.nav}>
          {login ? (
            <ul>
              <li>
                {user && user.name}
              </li>

              <li>
                <button className={styles.button} onClick={handleClick}>
                  Sair
                </button>
              </li>
            </ul>
          ) : location.pathname == "/cadastrar" ? (
            <Link to="/" className={styles.link}>
              Entrar
            </Link>
          ) : (
            <Link to="/cadastrar" className={styles.link}>
              Criar conta
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
