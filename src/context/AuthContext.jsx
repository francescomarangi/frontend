import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem("polizone_token", data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Errore di login:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Impossibile connettersi al server" 
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const data = await apiRegister(username, email, password);
      localStorage.setItem("polizone_token", data.token);
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      console.error("Errore di registrazione:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Errore durante la creazione dell'account" 
      };
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.log("Errore durante il logout lato server:", error);
    } finally {
      localStorage.removeItem("polizone_token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);