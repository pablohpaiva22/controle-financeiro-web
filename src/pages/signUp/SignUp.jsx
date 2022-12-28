import React from "react";
import styles from "./SignUp.module.scss";
import useFetch from "../../hooks/useFetch";
import useLogin from "../../hooks/useLogin";
import Input from "../../components/general/Input";
import { Link } from "react-router-dom";

function SignUp() {
  const [user, setUser] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passCheck, setPassCheck] = React.useState("");

  const { request, loading, error, data } = useFetch();
  const { signIn, loginLoading } = useLogin();

  React.useEffect(() => {
    if (data) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };

      signIn("https://new-project-server.vercel.app/login", options);
    }
  }, [data]);

  function handleSubmit(event) {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        email,
        password,
        passCheck,
      }),
    };

    const url = "https://new-project-server.vercel.app/newuser";

    request(url, options);
  }

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Criar Novo Usuário</h2>

        <Input
          id="newUser"
          type="text"
          value={user}
          setValue={setUser}
          label="Usuário"
        />
        <Input
          id="email"
          type="email"
          value={email}
          setValue={setEmail}
          label="E-mail"
          placehoder="email@example.com"
        />
        <Input
          id="password"
          type="password"
          value={password}
          setValue={setPassword}
          label="Senha"
        />
        <Input
          id="passCheck"
          type="password"
          value={passCheck}
          setValue={setPassCheck}
          label="Confirme a senha"
        />

        {loading || loginLoading ? (
          <button className={styles.loading} disabled>
            Carregando...
          </button>
        ) : (
          <button>Criar</button>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.footer}>
          Já é cadastrado? Faça{" "}
          <Link className={styles.footerLink} to={"/login"}>
            Login
          </Link>{" "}
        </p>
      </form>
    </section>
  );
}

export default SignUp;
