import React from "react";
import styles from "./MyAccount.module.scss";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

function MyAccount() {
  const { request, data, error, loading } = useFetch();
  const { setLogin } = React.useContext(GlobalContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    }

    if (error) {
      navigate("/login");
      localStorage.clear();
      setLogin(false);
    }
  }, [data, error]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const url = "https://new-project-server.herokuapp.com/getuser";

      const options = {
        method: "GET",
        headers: { authorization: "Bearer " + token },
      };

      request(url, options);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className={styles.container}>
      {data && <h1>My Account</h1>}
      {loading && <p>carregando...</p>}
    </div>
  );
}

export default MyAccount;
