import React from 'react';
import {useAuth} from '../../contexts/auth';

export default function Dashboard() {
  const { signed, Logout, user } = useAuth();

  async function handleLogout() {
    Logout();
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Bem vindo {user.name}</h2>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
