import React from 'react';
import styled from 'styled-components';

const TipsContainer = styled.div`
  margin: 20px 0;
`;

const TipCard = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const TrainingTips = ({ tips }) => (
  <TipsContainer>
    <h2>Training Tips</h2>
    {tips.map((tip, index) => (
      <TipCard key={index}>
        <h3>{tip.title}</h3>
        <p>{tip.content}</p>
      </TipCard>
    ))}
  </TipsContainer>
);

export default TrainingTips;
