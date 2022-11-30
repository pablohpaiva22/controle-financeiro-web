import React from "react";
import styles from "./Login.module.scss";
import useLogin from "../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/general/Input";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loginLoading, loginError, signIn } = useLogin();
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      navigate('/minhaconta')
    }

  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    signIn("https://new-project-server.herokuapp.com/login", options);
  }

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

      {loginLoading ? (
        <button className={styles.loading} disabled>
          Carregando...
        </button>
      ) : (
        <button>Entrar</button>
      )}

      {loginError && <p className={styles.error}>{loginError}</p>}

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
