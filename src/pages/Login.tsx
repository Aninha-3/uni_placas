import { useState } from 'react';
import '../css/Login.css';

export default function Login() {
  const [count, setCount] = useState(0);

   return(
    <section id="login">
      <h1>Faça login para continuar</h1>
      <input type="text" placeholder="Digite seu e-mail" />
      <input type="password" placeholder="Digite sua senha" />
      <button>Entrar</button>
    </section>
  );
}