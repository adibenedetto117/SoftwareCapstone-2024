import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: linear-gradient(90deg, #1d3557, #457b9d);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
`;

const NavLink = styled.li`
  a {
    color: #f1faee;
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: #a8dadc;
      text-decoration: underline;
    }
  }
`;

const LogoutButton = styled.button`
  background-color: #e63946;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d62828;
  }
`;

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Nav>
      <NavLinks>
        <NavLink><Link to="/">Home</Link></NavLink>
        <NavLink><Link to="/products">Explore Products</Link></NavLink>
        <NavLink><Link to="/how-to-sign-up">How to Sign Up</Link></NavLink>
        <NavLink><Link to="/training-plans">Training Plans</Link></NavLink> {/* Added Training Plans Link */}
        <NavLink><Link to="/nutrition-guide">Nutrition Guide</Link></NavLink>
        <NavLink><Link to="/gear-guide">Essential Gear</Link></NavLink>
        <NavLink><Link to="/race-day-preparation">Race Day Prep</Link></NavLink>

      </NavLinks>
      <NavLinks>
        {!token ? (
          <>
            <NavLink><Link to="/login">Login</Link></NavLink>
            <NavLink><Link to="/signup">Sign Up</Link></NavLink>
          </>
        ) : (
          <LogoutButton onClick={handleSignOut}>Sign Out</LogoutButton>
        )}
      </NavLinks>
    </Nav>
  );
};

export default NavBar;
