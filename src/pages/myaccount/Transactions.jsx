import React from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./Transactions.module.scss";
import useLogout from '../../hooks/useLogout'

function Transactions({ data, loading, setUpdateTransactions }) {
  const [transactionsArray, setTransactionsArray] = React.useState([]);
  const {
    data: deleteData,
    loading: deleteLoading,
    error,
    request,
  } = useFetch();
  const { logout } = useLogout()

  React.useEffect(() => {
    if (data) {
      setTransactionsArray(data.reverse());
    }
  }, [data]);

  React.useEffect(() => {
    if (deleteData) {
      setUpdateTransactions((updateTransactions) => !updateTransactions);
    }
  }, [deleteData]);

  function handleClick(event) {
    const token = localStorage.getItem("token");

    if (token) {
      const url = "https://new-project-server.vercel.app/deletetransaction";

      const options = {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ id: event.target.id }),
      };

      request(url, options);
    }
  }

  React.useEffect(() => {
    if (error === "Falha na autentificação - Token inválido") {
      logout()
    }
  }, [error]);

  return (
    <div className={styles.transactionsBox}>
      {loading ? (
        <p className={styles.loading}>Carregando...</p>
      ) : (
        transactionsArray &&
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

              {deleteLoading ? (
                <button
                  disabled
                  onClick={handleClick}
                  className={styles.deleteIcon}
                >
                  <img
                    id={item.id}
                    src="/delete-icon.png"
                    alt="delete icon"
                  />
                </button>
              ) : (
                <button onClick={handleClick} className={styles.deleteIcon}>
                  <img
                    id={item.id}
                    src="/delete-icon.png"
                    alt="delete icon"
                  />
                </button>
              )}
            </div>
          );
        })
      )}

      {data?.length === 0 && !loading && (
        <p className={styles.transactionsMessage}>
          Ainda não há nenhuma transação.
        </p>
      )}
    </div>
  );
}

export default Transactions;
