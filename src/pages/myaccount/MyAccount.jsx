import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import useFetch from "../../hooks/useFetch";
import styles from "./MyAccount.module.scss";
import Transactions from "./Transactions";
import Modal from "./Modal";
import BalanceInfo from "./BalanceInfo";

function MyAccount() {
  const [username, setUsername] = React.useState("");
  const [updateTransactions, setUpdateTransactions] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const { pathname } = useLocation();
  const { data, error, loading, request } = useFetch();
  const { setLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();

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

      <BalanceInfo data={data} updateTransactions={updateTransactions} />

      <button onClick={handleClick} className={styles.newTransactionBtn}>
        NOVA TRANSAÇÃO
      </button>

      <div className={styles.transactionsContainer}>
        <h2>TRANSAÇÕES</h2>

        <Transactions
          data={data}
          loading={loading}
          setUpdateTransactions={setUpdateTransactions}
        />

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
