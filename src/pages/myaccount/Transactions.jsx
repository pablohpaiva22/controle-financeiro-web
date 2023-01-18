import React from "react";
import styles from './Transactions.module.scss'

function Transactions({ data, loading }) {
  const [transactionsArray, setTransactionsArray] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setTransactionsArray(data.reverse());
    }
  }, [data]);

  return (
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
                <img src="../../src/assets/delete-icon.png" alt="delete icon" />
              </div>
            </div>
          );
        })}

      {data?.length === 0 && !loading && (
        <p className={styles.transactionsMessage}>
          Ainda não há nenhuma transação.
        </p>
      )}

      {loading && <p className={styles.loading}>Carregando...</p>}
    </div>
  );
}

export default Transactions;
