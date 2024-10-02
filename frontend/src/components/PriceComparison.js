import React from 'react';
import styled from 'styled-components';

const PriceComparisonContainer = styled.div`
  margin: 20px 0;
`;

const PriceCard = styled.div`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

const Link = styled.a`
  color: #1E90FF;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PriceComparison = ({ equipmentId, data }) => {
  const item = data.find((item) => item.id === equipmentId);

  if (!item) return null;

  return (
    <PriceComparisonContainer>
      <h2>Price Comparison for {item.name}</h2>
      {item.options.map((option, index) => (
        <PriceCard key={index}>
          <span>{option.site}</span>
          <span>{option.price}</span>
          <Link href={option.link} target="_blank" rel="noopener noreferrer">
            Visit Site
          </Link>
        </PriceCard>
      ))}
    </PriceComparisonContainer>
  );
};

export default PriceComparison;
