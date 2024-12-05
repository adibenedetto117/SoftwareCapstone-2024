// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f7f7f7;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2a9d8f;
    box-shadow: 0px 0px 4px rgba(42, 157, 143, 0.5);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2a9d8f;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #21867a;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const LoginTitle = styled.h2`
  text-align: center;
  color: #264653;
  margin-bottom: 20px;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/login', { username, password });
      localStorage.setItem('token', response.data.access_token);
      navigate('/products'); // Redirect to protected products page
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleLogin}>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </SubmitButton>
      </form>
    </LoginContainer>
  );
};

export default Login;
