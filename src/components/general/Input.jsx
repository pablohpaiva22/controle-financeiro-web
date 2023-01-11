import React from "react";
import styles from "./Input.module.scss";
import PropTypes from "prop-types";

function Input({ label, type, id, value, setValue, placehoder, labelColor }) {
  return (
    <div className={styles.container}>
      <label htmlFor={id} style={{color: labelColor}}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        placeholder={placehoder}
      />
    </div>
  );
}

Input.defaultProps = {
  label: "label",
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  placehoder: PropTypes.string,
};

export default Input;
