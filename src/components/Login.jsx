import React, { useState } from 'react';



const Login = ({ onLogin }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ idInstance, apiTokenInstance, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="Номер телефона получателя"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">Начать чат</button>
    </form>
  );
};

export default Login;