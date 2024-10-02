import React from 'react';
import styled from 'styled-components';

const EquipmentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const EquipmentCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  border-radius: 5px;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Equipment = ({ equipment, handleSelect }) => (
  <EquipmentContainer>
    {equipment.map((item) => (
      <EquipmentCard key={item.id} onClick={() => handleSelect(item)}>
        <div style={{ fontSize: '2.5rem' }}>{item.icon}</div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </EquipmentCard>
    ))}
  </EquipmentContainer>
);

export default Equipment;
