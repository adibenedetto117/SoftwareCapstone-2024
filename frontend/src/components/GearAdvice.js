import React from 'react';
import styled from 'styled-components';

const AdviceContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-left: 5px solid #1E90FF;
  border-radius: 5px;
`;

const GearAdvice = () => (
  <AdviceContainer>
    <h2>Finding the Right Gear Can Be Tough</h2>
    <p>
      Choosing the right gear for a triathlon is often overwhelming. With so many options available, it’s hard to know where to start. 
      The right gear can make all the difference in your performance and comfort during training and on race day. 
    </p>
    <p>
      That's why we've built this site to make the process easier for you. We search through multiple websites at once, so you can compare 
      prices and specifications all in one place. Our filters help you narrow down your choices based on budget, quality, and brand preference.
    </p>
    <p>
      Save time and money by finding the best deals without the hassle of searching multiple websites individually.
    </p>
  </AdviceContainer>
);

export default GearAdvice;
