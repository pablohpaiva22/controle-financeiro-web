import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./MyAccount.module.scss";
import { GlobalContext } from "../../context/GlobalContext";
import Transactions from "./Transactions";
import Modal from "./Modal";

function MyAccount() {
  const [username, setUsername] = React.useState("");
  const { pathname } = useLocation();
  const { data, error, loading, request } = useFetch();
  const { setLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const [modal, setModal] = React.useState(false);
  const [updateTransactions, setUpdateTransactions] = React.useState(false);

  const handleClick = () => {
    setModal((modal) => !modal);
  };

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
  }, [updateTransactions]);

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

      <button onClick={handleClick} className={styles.newTransactionBtn}>
        NOVA TRANSAÇÃO
      </button>

      <div className={styles.transactionsContainer}>
        <h2>TRANSAÇÕES</h2>

        <Transactions data={data} loading={loading} />

        <div className={styles.pigImage}>
          <img src="../../src/assets/pig.png" alt="cofrinho de porquinho" />
        </div>
      </div>

      {modal && (
        <Modal
          setModal={setModal}
          setUpdateTransactions={setUpdateTransactions}
        />
      )}
    </section>
  );
}

export default MyAccount;
