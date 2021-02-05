import React, { useContext, useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const initialState = {
    username: "",
    email: "",
    role: "",
    isAuthenticated: false,
  };

  const [user, setUser] = useState(initialState);

  const setUserDetails = (userDetails) => {
    setUser({
      ...initialState,
      ...userDetails,
      isAuthenticated: true,
    });
  };

  const logout = async () => {
    try {
      localStorage.clear();
      setUser(initialState);
      //   TODO : ROUTE  USER TO LOGIN SCREEN
      //   const response = await authAxios.get("/common/logout/");
      //   return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...user, logout, setUserDetails }}>
      {props.children}
    </AuthContext.Provider>
  );
};
