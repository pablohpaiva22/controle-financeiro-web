import React from "react";
import styles from "./Login.module.scss";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/general/Input";
import { GlobalContext } from "../../context/GlobalContext";

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

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    request("https://new-project-server.vercel.app/login", options);
  }

  React.useEffect(() => {
    if (data && data.token) {
      localStorage.setItem("token", data.token);

      setLogin(true);

      const url = "https://new-project-server.vercel.app/getuser";

      const options = {
        method: "GET",
        headers: { authorization: "Bearer " + data.token },
      };

      loginRequest(url, options);
    }
  }, [data]);

  React.useEffect(() => {
    if (loginData) {
      localStorage.setItem("user", JSON.stringify(loginData));
      navigate(`/minhaconta/${loginData.id}`);
    }

    if (error) {
      navigate("/login");
      localStorage.clear();
      setLogin(false);
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
            Sign-up
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
