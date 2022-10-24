import React from "react";
import styles from "./SignUp.module.scss";
import useFetch from "../../hooks/useFetch"
import Input from "../general/Input";
import { Link } from "react-router-dom";

function SignUp() {
  const [user, setUser] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passCheck, setPassCheck] = React.useState("");

  const { request, loading, error } = useFetch();

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

    request("https://new-project-server.herokuapp.com/newuser", options);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Criar Novo Usuário</h2>

      <Input id='newUser' type='text' value={user} setValue={setUser} label='Usuário' />
      <Input id='email' type='email' value={email} setValue={setEmail} label='E-mail' placehoder='email@example.com' />
      <Input id='password' type='password' value={password} setValue={setPassword} label='Senha' />
      <Input id='passCheck' type='password' value={passCheck} setValue={setPassCheck} label='Confirme a senha' />

      {loading ? (
        <button className={styles.loading} disabled>
          Carregando...
        </button>
      ) : (
        <button>Criar</button>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.footer}>
        Já é cadastrado? Faça{" "}
        <Link className={styles.footerLink} to={"/"}>
          Login
        </Link>{" "}
      </p>
    </form>
  );
}

export default SignUp;
