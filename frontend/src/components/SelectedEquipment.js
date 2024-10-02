import React from 'react';
import styled from 'styled-components';

const SelectedContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SelectedEquipment = ({ selectedItems }) => (
  <SelectedContainer>
    <h2>Selected Equipment</h2>
    {selectedItems.length > 0 ? (
      selectedItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))
    ) : (
      <p>No equipment selected.</p>
    )}
  </SelectedContainer>
);

export default SelectedEquipment;
