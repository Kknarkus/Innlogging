import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5001/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Registrert! Du kan logge inn nå.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="form">
      <h2>Registrer deg</h2>
      <input type="email" placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Passord" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Registrer</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default Register;
