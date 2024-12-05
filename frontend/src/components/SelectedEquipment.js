import React from 'react';
import styled from 'styled-components';

const SelectedContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SelectedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #264653;
  }
`;

const ClearButton = styled.button`
  padding: 8px 12px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #e64a19;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const SelectedItem = styled.div`
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  }

  h3 {
    margin: 0 0 5px 0;
    font-size: 1.2rem;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #666;
  }
`;

const EmptyMessage = styled.p`
  font-size: 1.1rem;
  color: #888;
  text-align: center;
  margin: 20px 0;
`;

const SelectedEquipment = ({ selectedItems, onClearSelection }) => (
  <SelectedContainer>
    <SelectedHeader>
      <h2>Selected Equipment ({selectedItems.length})</h2>
      <ClearButton
        onClick={onClearSelection}
        disabled={selectedItems.length === 0}
      >
        Clear Selection
      </ClearButton>
    </SelectedHeader>

    {selectedItems.length > 0 ? (
      selectedItems.map((item) => (
        <SelectedItem key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description || 'No description available.'}</p>
        </SelectedItem>
      ))
    ) : (
      <EmptyMessage>No equipment selected yet. Start exploring and add items to your selection!</EmptyMessage>
    )}
  </SelectedContainer>
);

export default SelectedEquipment;
