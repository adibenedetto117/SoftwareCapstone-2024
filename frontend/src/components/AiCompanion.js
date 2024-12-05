// src/components/AiCompanion.js
import React, { useState } from 'react';
import styled from 'styled-components';

const CompanionContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  background-color: #e0f7fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  ${({ yes }) =>
    yes
      ? `background-color: #4caf50; color: white;`
      : `background-color: #f44336; color: white;`}

  &:hover {
    opacity: 0.9;
  }
`;

const AiCompanion = ({ handleSelect }) => {
  const [step, setStep] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  const questions = [
    'Are you preparing for your first triathlon?',
    'Do you need a complete gear package?',
    'Do you prefer entry-level or advanced equipment?',
  ];

  const handleYes = () => {
    if (step === 2) {
      const recommendedItems = [
        { id: '3', Name: 'Road Bike', Price: 1200, Image_URL: 'https://via.placeholder.com/200' },
        { id: '4', Name: 'Wetsuit', Price: 400, Image_URL: 'https://via.placeholder.com/200' },
      ];
      setRecommendations(recommendedItems);
    }
    setStep((prev) => prev + 1);
  };

  return (
    <CompanionContainer>
      {step < questions.length ? (
        <>
          <Message>{questions[step]}</Message>
          <ButtonGroup>
            <Button yes onClick={handleYes}>Yes</Button>
            <Button onClick={() => setStep((prev) => prev + 1)}>No</Button>
          </ButtonGroup>
        </>
      ) : (
        <div>
          <h3>Recommended Items</h3>
          {recommendations.map((item) => (
            <div key={item.id}>
              <p>{item.Name}</p>
              <button onClick={() => handleSelect(item)}>Add to Selection</button>
            </div>
          ))}
        </div>
      )}
    </CompanionContainer>
  );
};

export default AiCompanion;
