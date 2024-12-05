import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

// Grid container styling
const EquipmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// Each equipment item card styling
const EquipmentItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: ${({ isSelected }) => (isSelected ? '#f0f8ff' : '#fff')};
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
  }
`;

const EquipmentImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ItemName = styled.h3`
  margin: 5px 0;
  font-size: 1.1rem;
  color: #333;
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  color: #4caf50;
  font-weight: bold;
  margin: 5px 0;
`;

const ModalButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${({ color }) => color || '#007bff'};
  color: white;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || '#0056b3'};
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const ModalContent = styled.div`
  text-align: center;
  padding: 20px;

  img {
    max-height: 300px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  ul {
    text-align: left;
    margin: 10px 0;
    padding-left: 20px;
  }

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Equipment = ({ equipment, onAddToSelection, selectedItems = [] }) => {
  const [modalItem, setModalItem] = useState(null);

  const openModal = (item) => setModalItem(item);
  const closeModal = () => setModalItem(null);

  const isSelected = (item) =>
    (selectedItems || []).some((selected) => selected.id === item.id);

  const handleSelectionToggle = (item) => {
    if (isSelected(item)) {
      onAddToSelection(item, true);
    } else {
      onAddToSelection(item, false);
    }
  };

  return (
    <>
      {/* Grid layout for the equipment items */}
      <EquipmentGrid>
        {equipment.map((item) => (
          <EquipmentItem
            key={item.id}
            isSelected={isSelected(item)}
            onClick={() => openModal(item)}
          >
            <EquipmentImage src={item.image_url} alt={item.name} />
            <ItemName>{item.name}</ItemName>
            <p>Brand: {item.brand}</p>
            <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
          </EquipmentItem>
        ))}
      </EquipmentGrid>

      {/* Modal for displaying equipment details */}
      {modalItem && (
        <Modal
          isOpen={!!modalItem}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={{
            content: {
              maxWidth: '500px',
              margin: 'auto',
              padding: '20px',
              borderRadius: '10px',
            },
          }}
        >
          <ModalContent>
            <h2>{modalItem.name}</h2>
            <img
              src={modalItem.image_url}
              alt={modalItem.name}
            />
            <p><strong>Brand:</strong> {modalItem.brand}</p>
            <p><strong>Price:</strong> ${modalItem.price.toFixed(2)}</p>

            {modalItem.details && Array.isArray(modalItem.details) && modalItem.details.length > 0 && (
              <>
                <h4>Details:</h4>
                <ul>
                  {modalItem.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </>
            )}

            {modalItem.tech_specs && Object.keys(modalItem.tech_specs).length > 0 && (
              <>
                <h4>Tech Specs:</h4>
                <ul>
                  {Object.entries(modalItem.tech_specs).map(([key, value], index) => (
                    <li key={index}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {modalItem.link && (
              <div>
                <a href={modalItem.link} target="_blank" rel="noopener noreferrer">
                  View Product Page
                </a>
              </div>
            )}

            <ModalButton
              color={isSelected(modalItem) ? '#dc3545' : '#28a745'}
              hoverColor={isSelected(modalItem) ? '#c82333' : '#218838'}
              onClick={() => handleSelectionToggle(modalItem)}
            >
              {isSelected(modalItem) ? 'Remove from Selection' : 'Add to Selection'}
            </ModalButton>
            <ModalButton color="#6c757d" hoverColor="#5a6268" onClick={closeModal}>
              Close
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Equipment;
