import React from "react";
import styles from "./Login.module.scss";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/general/Input";
import { GlobalContext } from "../../context/GlobalContext";
import useLogout from "../../hooks/useLogout";
import { SIGNIN, GET_USER } from "../../api/index";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { data, loading, error, request } = useFetch();
  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
    request: loginRequest,
  } = useFetch();
  const { setLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const { id } = JSON.parse(user);
      navigate(`/minhaconta/${id}`);
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const { url, options } = SIGNIN(email, password);

    request(url, options);
  }

  React.useEffect(() => {
    if (data && data.token) {
      localStorage.setItem("token", data.token);

      setLogin(true);

      const { url, options } = GET_USER(data.token)

      loginRequest(url, options);
    }
  }, [data]);

  React.useEffect(() => {
    if (loginData) {
      localStorage.setItem("user", JSON.stringify(loginData));
      navigate(`/minhaconta/${loginData.id}`);
    }

    if (loginError) {
      useLogout();
    }
  }, [loginData, loginError]);

  return (
    <section className={styles.container}>
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

        {loading || loginLoading ? (
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
    </section>
  );
}

export default Login;
