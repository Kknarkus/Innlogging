import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="home">
      <h1>Velkommen!</h1>
      <button onClick={logout}>Logg ut</button>
    </div>
  );
};

export default Home;
