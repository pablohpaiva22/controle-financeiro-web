import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MyAccount.module.scss";

function MyAccount() {
  const [username, setUsername] = React.useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  React.useEffect(() => {
    const user = localStorage.getItem('user')
    
    if (user) {
      const userObj = JSON.parse(user)
      const getId = Number(pathname.replace('/minhaconta/', " "))
      if (getId === userObj.id) {
        setUsername(userObj.name)
      } else {
        navigate('/')
      }
    } else {
      navigate('/')
    }
  }, [])

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

        <div className={styles.transactions}>
          <span className={styles.date}>09/10</span>
          <p className={styles.description}>Corte de cabelo</p>
          <span className={styles.price}>R$ 30,00</span>
          <img
            className={styles.deleteIcon}
            src="../../src/assets/delete-icon.png"
            alt="delete icon"
          />
        </div>

        <div className={styles.pigImage}>
          <img src="../../src/assets/pig.png" alt="cofrinho de porquinho" />
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
