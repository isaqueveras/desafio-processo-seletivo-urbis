import React, { useState } from 'react';
import {useAuth} from '../../contexts/auth';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signed, Login } = useAuth();

  async function handleSignIn() {
    await Login({
      email: email,
      password: password,
    });
  }
  
  return (
    <div>
      <h1>Login</h1>
      <label>Email: </label>
      <input placeholder="Email" type="email" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
      <label>Senha: </label>
      <input placeholder="Senha" type="password" value={password} onChange={event => setPassword(event.target.value)} /><br/>

      <button onClick={handleSignIn}>Login</button>

    </div>
  );
}