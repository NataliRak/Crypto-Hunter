import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useState, useEffect, useContext } from "react";
import { CoinList } from "./config/api";
import { auth, db } from "./firebase";

const Crypto = createContext();
const CryptoContex = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "ILS") {
      setSymbol("₪");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContex;
export const CryptoState = () => {
  return useContext(Crypto);
};
