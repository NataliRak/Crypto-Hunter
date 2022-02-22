import React, { createContext, useState, useEffect, useContext } from "react";

const Crypto = createContext();
const CryptoContex = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "ILS") {
      setSymbol("₪");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContex;
export const CryptoState = () => {
  return useContext(Crypto);
};
