import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginMobile, setLoginMobile] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, mail, mobile }),
      });

      const data = await response.json();
      setMessage(`Signup successful. Your ID: ${data.id}`);
    } catch (error) {
      setMessage('An error occurred during signup.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loginUsername, mobile: loginMobile }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Login failed. Invalid credentials.');
    }
  };

  return (
    <div className="App">
      <h1>Account Signup and Login</h1>
      <div>
        <h2>Signup</h2>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="Email" onChange={(e) => setMail(e.target.value)} />
        <input type="text" placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} />
        <button onClick={handleSignup}>Signup</button>
      </div>
      <div>
        <h2>Login</h2>
        <input type="text" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)} />
        <input type="text" placeholder="Mobile" onChange={(e) => setLoginMobile(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="message">{message}</div>
    </div>
  );
}

export default App;
