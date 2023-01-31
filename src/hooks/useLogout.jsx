import React from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const { setLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    setLogin(false);
    navigate("/");
  }

  return {
    logout,
  };
}

export default useLogout;
