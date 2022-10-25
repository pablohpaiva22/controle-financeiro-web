import React from "react";

export const GlobalContext = React.createContext();

export function UserStorage({ children }) {
  const [login, setLogin] = React.useState(false);

  return (
    <GlobalContext.Provider value={{ login, setLogin }}>
      {children}
    </GlobalContext.Provider>
  );
}