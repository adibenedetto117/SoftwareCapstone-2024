import React from 'react';
import styled from 'styled-components';

const AdviceContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-left: 5px solid #1E90FF;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const AdviceTitle = styled.h2`
  font-size: 1.8rem;
  color: #264653;
  margin-bottom: 15px;
`;

const AdviceParagraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 15px;
`;

const HighlightText = styled.span`
  font-weight: bold;
  color: #1E90FF;
`;

const GearAdvice = () => (
  <AdviceContainer>
    <AdviceTitle>Finding the Right Gear Can Be Tough</AdviceTitle>
    <AdviceParagraph>
      Choosing the right gear for a triathlon can be overwhelming. With countless options available, it’s often hard to know where to begin. 
      However, having the <HighlightText>right gear</HighlightText> can significantly enhance your performance and comfort during training 
      and on race day.
    </AdviceParagraph>
    <AdviceParagraph>
      That’s why we’ve created this platform to simplify the process. By searching through multiple websites simultaneously, we provide a 
      comprehensive comparison of prices and specifications, all in one convenient location. Our filters allow you to narrow down your 
      options based on your budget, preferred quality, and favorite brands.
    </AdviceParagraph>
    <AdviceParagraph>
      Save both time and money by finding the <HighlightText>best deals</HighlightText> without the hassle of navigating numerous websites 
      individually. Let us help you make the right choice with ease and confidence.
    </AdviceParagraph>
  </AdviceContainer>
);

export default GearAdvice;
