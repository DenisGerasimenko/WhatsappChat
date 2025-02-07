import React, { useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({});

  const handleLogin = (data) => {
    setCredentials(data);
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Chat
          idInstance={credentials.idInstance}
          apiTokenInstance={credentials.apiTokenInstance}
          phone={credentials.phone}
        />
      )}
    </div>
  );
};

export default App;
