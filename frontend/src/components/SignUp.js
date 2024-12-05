// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignUpContainer = styled.div`
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
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2a9d8f;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #21867a;
  }
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', { username, password });
      navigate('/login');  // Redirect to login after successful sign up
    } catch (err) {
      setError('Error during registration. Try again.');
    }
  };

  return (
    <SignUpContainer>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignUp}>
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
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
