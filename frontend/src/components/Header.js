import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  padding: 20px 0;
  background-color: #1E90FF;
  color: white;
  text-align: center;
`;

const Header = () => (
  <HeaderWrapper>
    <h1>Triathlon Starter Guide</h1>
    <p>Your Ultimate Companion for Triathlon Training and Race Day</p>
  </HeaderWrapper>
);

export default Header;
