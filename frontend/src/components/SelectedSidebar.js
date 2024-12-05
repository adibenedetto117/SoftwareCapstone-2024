// src/components/SelectedSidebar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

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
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  background-color: #f1f5f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e3f2fd;
  }
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const TotalPrice = styled.div`
  margin-top: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
`;

const ModalContent = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: auto;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 15px;
  object-fit: contain;
  border-radius: 8px;
`;

const SelectedSidebar = ({ selectedItems, removeItem }) => {
  const [modalItem, setModalItem] = useState(null);

  return (
    <SidebarContainer>
      <h2>Selected Items</h2>
      {selectedItems.length === 0 ? (
        <p>No items selected.</p>
      ) : (
        selectedItems.map((item) => (
          <Item key={item.id} onClick={() => setModalItem(item)}>
            <span>{item.Name}</span>
            <span>${item.Price}</span>
            <RemoveButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal from opening on remove click
                removeItem(item.id);
              }}
            >
              Remove
            </RemoveButton>
          </Item>
        ))
      )}

      <TotalPrice>
        Total: $
        {selectedItems.reduce((total, item) => total + parseFloat(item.Price || 0), 0).toFixed(2)}
      </TotalPrice>

      {modalItem && (
        <Modal
          isOpen={!!modalItem}
          onRequestClose={() => setModalItem(null)}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: '30px',
              width: '50%',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              border: 'none',
            },
          }}
        >
          <ModalContent>
            <h2>{modalItem.Name}</h2>
            <ModalImage src={modalItem.Image_URL} alt={modalItem.Name} />
            <p><strong>Brand:</strong> {modalItem.Brand}</p>
            <p><strong>Price:</strong> ${modalItem.Price}</p>

            {modalItem.Details && (
              <>
                <h4>Details</h4>
                <ul>
                  {modalItem.Details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </>
            )}

            <button onClick={() => setModalItem(null)}>Close</button>
          </ModalContent>
        </Modal>
      )}
    </SidebarContainer>
  );
};

export default SelectedSidebar;
