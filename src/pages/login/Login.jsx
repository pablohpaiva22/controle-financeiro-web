import React from "react";
import styles from "./Login.module.scss";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/general/Input";
import { GlobalContext } from "../../context/GlobalContext";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { setLogin } = React.useContext(GlobalContext);
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    request("https://new-project-server.herokuapp.com/login", options);
  }

  React.useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      navigate('/minhaconta')
    }

    if (data && data.token) {
      localStorage.setItem("token", data.token);

      setLogin(true);
      navigate('/minhaconta')
    }

  }, [data]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Login</h2>

      <Input
        label="E-mail"
        id="loginEmail"
        type="email"
        setValue={setEmail}
        value={email}
      />
      <Input
        label="Senha"
        id="pass"
        type="password"
        setValue={setPassword}
        value={password}
      />

      {loading ? (
        <button className={styles.loading} disabled>
          Carregando...
        </button>
      ) : (
        <button>Entrar</button>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.footer}>
        Ainda não é cadastrado?{" "}
        <Link className={styles.footerLink} to={"/cadastrar"}>
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}

export default Login;
