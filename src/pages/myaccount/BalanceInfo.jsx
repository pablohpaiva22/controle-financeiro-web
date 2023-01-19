import React from "react";
import styles from "./BalanceInfo.module.scss";

function BalanceInfo({ data }) {
  const [inputsValue, setInputsValue] = React.useState("");
  const [outputsValue, setOutputsValue] = React.useState("");
  const [balanceValue, setBalanceValue] = React.useState("");

  React.useEffect(() => {
    if (data) {
      const inputs = data
        .filter((item) => {
          return item.type === "entrada";
        })
        .map((item) => {
          return Number(item.price.replace(",", "."));
        });

      const outputs = data
        .filter((item) => {
          return item.type === "saida";
        })
        .map((item) => {
          return Number(item.price.replace(",", "."));
        });

      let inputSum;
      let outputSum;

      if (inputs.length !== 0) {
        inputSum = inputs.reduce((acc, item) => {
          return acc + item;
        });
      } else {
        inputSum = 0;
      }

      if (outputs.length !== 0) {
        outputSum = outputs.reduce((acc, item) => {
          return acc + item;
        });
      } else {
        outputSum = 0;
      }

      const formattedBalance = `R$ ${(inputSum - outputSum)
        .toFixed(2)
        .replace(".", ",")}`;
      const formattedInputs = `R$ ${inputSum.toFixed(2).replace(".", ",")}`;
      const formattedOutputs = `R$ ${outputSum.toFixed(2).replace(".", ",")}`;

      setInputsValue(formattedInputs);
      setOutputsValue(formattedOutputs);
      setBalanceValue(formattedBalance);
    }
  }, [data]);

  return (
    <div className={styles.balanceInfo}>
      <div className={styles.balance}>
        <span>SALDO</span>
        {balanceValue ? <span>{balanceValue}</span> : <span>-</span>}
      </div>

      <div className={styles.inputOutput}>
        <div className={styles.input}>
          <span>ENTRADAS</span>
          <span>
            {inputsValue ? <span>{inputsValue}</span> : <span>-</span>}
          </span>
        </div>

        <div className={styles.output}>
          <span>SAÍDAS</span>
          <span>
            {outputsValue ? <span>{outputsValue}</span> : <span>-</span>}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BalanceInfo;
