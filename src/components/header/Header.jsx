import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import styles from "./Header.module.scss";

function Header() {
  const { login, setLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

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
              src="../../src/assets/cifrao.png"
              alt="logo imagem de um cifrao"
            />
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
                    isActive ? { color: "#4b6b9b" } : undefined
                  }
                >
                  Pablo Paiva
                </NavLink>
              </li>

              <li>
                <button className={styles.button} onClick={handleClick}>
                  Sair
                </button>
              </li>
            </ul>
          ) : location.pathname == "/cadastrar" ? (
            <Link to="/" className={styles.link}>
              Login
            </Link>
          ) : (
            <Link to="/cadastrar" className={styles.link}>
              Sign-up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
