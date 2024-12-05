// Equipment.js
import React from 'react';

function Equipment({ equipment, handleSelect }) {
  return (
    <div>
      <h2>Equipment List</h2>
      <ul>
        {equipment.map((item, index) => (
          <li key={index}>
            <h3>{item.Name}</h3>
            <p>Brand: {item.Brand}</p>
            <p>Price: ${item.Price}</p>
            <button onClick={() => handleSelect(item)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Equipment;
