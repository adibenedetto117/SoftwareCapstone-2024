import React, { useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';

import Header from './components/Header';
import Equipment from './components/Equipment';
import EquipmentSearch from './components/EquipmentSearch';
import PriceComparison from './components/PriceComparison';
import GearAdvice from './components/GearAdvice';
import SelectedSidebar from './components/SelectedSidebar';
import Timeline from './components/Timeline';
import TrainingTips from './components/TrainingTips';

import { equipmentData } from './data/equipmentData';
import { priceData } from './data/priceData';
import { timelineData } from './data/timelineData';
import { trainingTipsData } from './data/trainingTipsData';

// Main container to handle the two-column layout
const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  max-width: 1200px;
`;

const ContentArea = styled.div`
  flex: 2;
  padding-right: 20px;
`;

const SidebarArea = styled.div`
  flex: 1;
  padding-left: 20px;
`;

function App() {
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData);

  const handleSelect = (item) => {
    const itemWithPrice = {
      ...item,
      price: item.price || '$100', // Example pricing for items without a price
    };
    setSelectedEquipment((prev) =>
      prev.find((i) => i.id === itemWithPrice.id)
        ? prev.filter((i) => i.id !== itemWithPrice.id)
        : [...prev, itemWithPrice]
    );
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredEquipment(equipmentData);
    } else {
      setFilteredEquipment(
        equipmentData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    setSelectedEquipment(selectedEquipment.filter((item) => item.id !== id));
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <GearAdvice />

      <MainContainer>
        <ContentArea>
          <EquipmentSearch equipment={equipmentData} onSearch={handleSearch} />
          <Equipment equipment={filteredEquipment} handleSelect={handleSelect} />
         {/* <Timeline timeline={timelineData} />*/}
          <TrainingTips tips={trainingTipsData} />
        </ContentArea>

        <SidebarArea>
          <SelectedSidebar selectedItems={selectedEquipment} removeItem={handleRemoveItem} />
        </SidebarArea>
      </MainContainer>
    </>
  );
}

export default App;
