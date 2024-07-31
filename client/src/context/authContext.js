import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8008/api/auth/login", inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data)
    localStorage.setItem("refresh_token", res.data.refresh_token);
  };
  const logout = async () => {
    const refresh_token = { refresh_token: localStorage.getItem("refresh_token") };
    await axios.post("http://localhost:8008/api/auth/logout",refresh_token, {
      withCredentials: true,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};