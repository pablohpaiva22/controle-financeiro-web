import React from "react";
import styles from "./MyAccount.module.scss";
import useFetch from '../../hooks/useFetch'
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const { request, data, error, loading } = useFetch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data))
    }
  }, [data])
  
  React.useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      async function getUser() {
        const url = "https://new-project-server.herokuapp.com/getuser"

        const options = {
          method: "GET",
          headers: { authorization: "Bearer " + token },
        }
        
        request (url, options)
      }

      getUser();
    } else {
      navigate('/login')
    }
  }, []);

  return (
    <div className={styles.container}>
      {data && <h1>My Account</h1>}
      {loading && <p>carregando...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default MyAccount;
