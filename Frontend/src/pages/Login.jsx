import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5001/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>Login</h2>
      <input type="email" placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Passord" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Logg inn</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Login;
