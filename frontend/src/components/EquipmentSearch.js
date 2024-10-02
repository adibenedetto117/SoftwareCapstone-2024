import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin: 20px 0;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const EquipmentSearch = ({ equipment, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <SearchContainer>
      <h2>Search for Equipment</h2>
      <SearchInput 
        type="text" 
        placeholder="Search equipment (e.g., bike, goggles, shoes)" 
        value={searchTerm} 
        onChange={handleSearch} 
      />
    </SearchContainer>
  );
};

export default EquipmentSearch;
