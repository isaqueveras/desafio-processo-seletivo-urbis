import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import * as conn from '../services/api';

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@Urbis:user');
    const storagedToken = localStorage.getItem('@Urbis:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers['x-access-token'] = storagedToken;
    }
  }, [])

  async function Login(user) {
    const response = await conn.Auth(user);

    setUser(response.data);
    api.defaults.headers['x-access-token'] = response.data.token;

    localStorage.setItem('@Urbis:user', JSON.stringify(response.data));
    localStorage.setItem('@Urbis:token', response.data.token);
  }

  function Logout() {
    setUser(null);
    localStorage.removeItem('@Urbis:user');
    localStorage.removeItem('@Urbis:token');
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }} >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
