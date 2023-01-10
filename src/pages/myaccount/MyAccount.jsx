import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./MyAccount.module.scss";
import { GlobalContext } from "../../context/GlobalContext";

function MyAccount() {
  const [username, setUsername] = React.useState("");
  const { pathname } = useLocation();
  const { data, error, loading, request } = useFetch();
  const { setLogin } = React.useContext(GlobalContext);
  const [ transactionsArray, setTransactionsArray] = React.useState([])
  const navigate = useNavigate();

  React.useEffect(() => {
    if (error === "Falha na autentificação - Token inválido") {
      navigate("/");
      localStorage.clear();
      setLogin(false);
    }
  }, [error]);

  React.useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userObj = JSON.parse(user);
      const getId = Number(pathname.replace("/minhaconta/", " "));
      if (getId === userObj.id) {
        setUsername(userObj.name);
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }

    const token = localStorage.getItem("token");

    if (token) {
      const url = "https://new-project-server.vercel.app/gettransactions";

      const options = {
        method: "GET",
        headers: { authorization: "Bearer " + token },
      };

      request(url, options);
    } else {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    if (data) {
      setTransactionsArray(data.reverse())
    }
  }, [data])

  return (
    <section className={styles.container}>
      <div className={styles.dollarSignBg}>
        <div className={styles.dollarSign}>
          <img
            src="../../src/assets/cifrao1.png"
            alt="imagem de um cifrao verde"
          />
        </div>
      </div>

      <span className={styles.welcomeMessage}>Bem-vindo, {username}!!!</span>

      <h1>CONTROLE FINANCEIRO</h1>

      <div className={styles.balanceInfo}>
        <div className={styles.balance}>
          <span>SALDO</span>
          <span>R$ 500,00</span>
        </div>

        <div className={styles.inputOutput}>
          <div className={styles.input}>
            <span>ENTRADAS</span>
            <span>R$ 500,00</span>
          </div>

          <div className={styles.output}>
            <span>SAÍDAS</span>
            <span>R$ 500,00</span>
          </div>
        </div>
      </div>

      <button className={styles.newTransactionBtn}>NOVA TRANSAÇÃO</button>

      <div className={styles.transactionsContainer}>
        <h2>TRANSAÇÕES</h2>

        <div className={styles.transactionsBox}>
          {transactionsArray &&
            transactionsArray.map((item) => {
              return (
                <div key={item.id} className={styles.transactions}>
                  <span className={styles.date}>{item.date}</span>
                  <p className={styles.description}>{item.description}</p>
                  <div className={styles.price}>
                    <span>R$ {item.price}</span>
                    <span
                      style={
                        item.type === "entrada"
                          ? { background: "#19880f" }
                          : { background: "#ef1111" }
                      }
                      className={styles.tag}
                    ></span>
                  </div>
                  <div className={styles.deleteIcon}>
                    <img
                      src="../../src/assets/delete-icon.png"
                      alt="delete icon"
                    />
                  </div>
                </div>
              );
            })}

          {data?.length === 0 && (
            <p className={styles.transactionsMessage}>
              Ainda não há nenhuma transação.
            </p>
          )}

          {loading && <p className={styles.loading}>Carregando...</p>}
        </div>

        <div className={styles.pigImage}>
          <img src="../../src/assets/pig.png" alt="cofrinho de porquinho" />
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
