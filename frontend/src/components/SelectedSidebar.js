import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  position: sticky;
  top: 20px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const TotalPrice = styled.div`
  margin-top: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
`;

const SelectedSidebar = ({ selectedItems, removeItem }) => {
  // Calculate the total price from selected items
  const totalPrice = selectedItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace('$', ''));
    return total + itemPrice;
  }, 0);

  return (
    <SidebarContainer>
      <h2>Selected Items</h2>
      {selectedItems.length === 0 ? (
        <p>No items selected.</p>
      ) : (
        selectedItems.map((item) => (
          <Item key={item.id}>
            <span>{item.name}</span>
            <span>{item.price}</span>
            <RemoveButton onClick={() => removeItem(item.id)}>Remove</RemoveButton>
          </Item>
        ))
      )}
      <TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>
    </SidebarContainer>
  );
};

export default SelectedSidebar;
