import React from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

const baseURL = "http://127.0.0.1:3333";
const headers = {
  "Content-Type": "application/json",
  accept: "application/json",
};
const timeout = 5000;

export function AuthProvider({ children }) {
  function signup(user) {
    return axios.post(`${baseURL}/user`, user, {
      headers,
      timeout,
    });
  }

  function login(data) {
    return axios.post(`${baseURL}/login`, data).then((response) => {
      localStorage.setItem("token", response.data.token);
    });
  }

  function logout() {
    localStorage.removeItem("token");
  }

  const value = {
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
