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
