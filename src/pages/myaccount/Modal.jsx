import React from "react";
import styles from "./Modal.module.scss";
import Input from "../../components/general/Input";
import useFetch from "../../hooks/useFetch";
import { NEW_TRANSACTION } from "../../api";

function Modal({ setModal, setUpdateTransactions }) {
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [type, setType] = React.useState("");
  const [emptyFieldError, setEmptyFieldError] = React.useState(false);
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    if (data && data.msg === 'Nova transação criada com sucesso!') {
      setModal(false)
      setUpdateTransactions((updateTransactions) => !updateTransactions)
    }
  }, [data])
  
  const handleClick = (event) => {
    if (event.target.id === "modal") {
      setModal(false);
    }
  };

  const handleChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const useriD = JSON.parse(localStorage.getItem("user"));
    const id_user = useriD.id;

    const newDate = Date.now();
    const date = new Date(newDate).toJSON().slice(0, 10);

    const token = localStorage.getItem("token");

    if (token) {
      if (description.length && price.length && type.length !== 0) {
        setEmptyFieldError(false);

        const { url, options } = NEW_TRANSACTION(token, description, price, type, id_user, date)

        request(url, options);
      } else {
        setEmptyFieldError(true);
      }
    }
  };

  return (
    <div onClick={handleClick} className={styles.modalBg} id="modal">
      <div className={styles.modal}>
        <h2>NOVA TRANSAÇÃO</h2>

        <form onSubmit={handleSubmit} className={styles.newTransactionForm}>
          <Input
            label="DESCRIÇÃO"
            type="text"
            id="description"
            value={description}
            setValue={setDescription}
            labelColor="white"
            maxLength={15}
          />
          <Input
            label="VALOR"
            type="number"
            id="price"
            value={price}
            setValue={setPrice}
            labelColor="white"
          />

          <div>
            <span className={styles.transactionTypeLabel}>TIPO</span>

            <div className={styles.typeBox}>
              <div>
                <input
                  type="radio"
                  id="typeInput"
                  name="type"
                  className={styles.typeInput}
                  onChange={handleChange}
                  value="entrada"
                />
                <label htmlFor="typeInput" className={styles.typeLabel}>
                  Entrada
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="typeOutput"
                  className={styles.typeOutput}
                  name="type"
                  onChange={handleChange}
                  value="saida"
                />
                <label htmlFor="typeOutput" className={styles.typeLabel}>
                  Saída
                </label>
              </div>
            </div>
          </div>

          {loading ? (
            <button className={styles.modalButton}>CRIANDO...</button>
          ) : (
            <button className={styles.modalButton}>CRIAR</button>
          )}

          {error && <span className={styles.requestError}>Error.</span>}

          {emptyFieldError && <p className={styles.emptyFieldError}>Preencha os campos vazios.</p>}
        </form>
      </div>
    </div>
  );
}

export default Modal;
