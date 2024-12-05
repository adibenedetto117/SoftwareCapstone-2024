import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${({ variant }) => (variant === 'reset' ? '#6c757d' : '#007bff')};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ variant }) => (variant === 'reset' ? '#5a6268' : '#0056b3')};
  }
`;

const EquipmentSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    if (parseFloat(minPrice) < 0 || parseFloat(maxPrice) < 0) {
      alert('Price values must be positive.');
      return;
    }
    if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
      alert('Min Price cannot be greater than Max Price.');
      return;
    }
    onSearch(searchTerm, category, minPrice, maxPrice);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCategory('all');
    setMinPrice('');
    setMaxPrice('');
    onSearch('', 'all', '', '');
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search items..."
        aria-label="Search items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Select category"
      >
        <option value="all">All Categories</option>
        <option value="bike">Bikes</option>
        <option value="helmet">Helmets</option>
        <option value="wetsuit">Wetsuits</option>
        <option value="accessories">Accessories</option>
      </Select>
      <Input
        type="number"
        min="0"
        placeholder="Min Price"
        aria-label="Minimum price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <Input
        type="number"
        min="0"
        placeholder="Max Price"
        aria-label="Maximum price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <Button variant="reset" onClick={handleReset}>
        Reset
      </Button>
    </SearchContainer>
  );
};

export default EquipmentSearch;
