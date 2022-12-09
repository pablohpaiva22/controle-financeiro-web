import React from "react";

export const GlobalContext = React.createContext("");

export function UserStorage({ children }) {
  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      setLogin(true)
    }
  }, [])

  return (
    <GlobalContext.Provider value={{ login, setLogin }}>
      {children}
    </GlobalContext.Provider>
  );
}