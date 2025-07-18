import React, { createContext, useState, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
// Crear el contexto de autenticación
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (username) => {
    // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
    const token = `fake-token-${username}`;
    if(username == "prueba@gmail.com"){ 
      setAdmin(true)
    }
    localStorage.setItem('authToken', token);
    localStorage.setItem('usuario', username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
    setUser(null);
    setAdmin(false);
    // dispararSweetBasico("Sesion Cerrada","","warning","OK");
    toast.success("Sesion cerrada!");
    
  };

  function verificacionLog(){
    const userToken = localStorage.getItem("authToken")
    if(userToken && userToken == "fake-token-prueba@gmail.com"){
      setAdmin(true)
      return
    }if(userToken){
      setUser(userToken)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, admin, verificacionLog }}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
    );
}
export const useAuthContext = () => useContext(AuthContext);