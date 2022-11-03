import React from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const useLogin = () => {
  const [loginData, setLoginData] = React.useState(null);
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState(null);
  const { setLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loginData && loginData.token) {
      localStorage.setItem("token", loginData.token);

      setLogin(true);
      navigate("/minhaconta");
    }
  }, [loginData]);

  const signIn = async (url, options) => {
    try {
      setLoginError(null);
      setLoginLoading(true);
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) throw new Error(json.msg);
      setLoginData(json);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return {
    loginData,
    loginLoading,
    loginError,
    signIn,
  };
};

export default useLogin;
