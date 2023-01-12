import React from "react";
import styles from "./Modal.module.scss";
import Input from "../../components/general/Input";

function Modal({ setModal }) {
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleClick = (event) => {
    if (event.target.id === "modal") {
      setModal(false)
    }
  };

  return (
    <div onClick={handleClick} className={styles.modalBg} id="modal">
      <div className={styles.modal}>
        <h2>NOVA TRANSAÇÃO</h2>

        <form className={styles.newTransactionForm}>
          <Input
            label="DESCRIÇÃO"
            type="text"
            id="description"
            value={description}
            setValue={setDescription}
            labelColor="white"
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
                />
                <label htmlFor="typeOutput" className={styles.typeLabel}>
                  Saída
                </label>
              </div>
            </div>
          </div>

          <button className={styles.modalButton}>CRIAR </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
