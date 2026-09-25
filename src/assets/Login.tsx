import { useState } from 'react';
import './Login.css';

function Login() {
  const [count, setCount] = useState(0);

   return(
    <section id="login">
      <h1>Faça login para continuar</h1>
      
      <p>Count is {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </section>
  );
}