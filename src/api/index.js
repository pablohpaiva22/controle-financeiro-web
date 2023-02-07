export const SIGNIN = (email, password) => {
  const url = "https://new-project-server.vercel.app/login";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, password }),
  };

  return {
    url,
    options,
  };
};

export const GET_USER = (token) => {
  const url = "https://new-project-server.vercel.app/getuser";

  const options = {
    method: "GET",
    headers: { authorization: "Bearer " + token },
  };

  return {
    url,
    options,
  };
};

export const GET_TRANSACTIONS = (token) => {
  const url = "https://new-project-server.vercel.app/gettransactions";

  const options = {
    method: "GET",
    headers: { authorization: "Bearer " + token },
  };

  return {
    url,
    options,
  };
};

export const DELETE_TRANSACTION = (token, id) => {
  const url = "https://new-project-server.vercel.app/deletetransaction";

  const options = {
    method: "DELETE",
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ id }),
  };

  return {
    url,
    options,
  };
};

export const NEW_TRANSACTION = (
  token,
  description,
  price,
  type,
  id_user,
  date
) => {
  const url = "https://new-project-server.vercel.app/newtransaction";

  const options = {
    method: "POST",
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ description, price, type, id_user, date }),
  };

  return {
    url,
    options,
  };
};

export const NEW_USER = (user, email, password, passCheck) => {
  const url = "https://new-project-server.vercel.app/newuser";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      email,
      password,
      passCheck,
    }),
  };

  return {
    url,
    options,
  };
};
