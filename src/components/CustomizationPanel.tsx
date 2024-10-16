import React, { useState } from 'react';

function CustomizationPanel() {
  const [size, setSize] = useState('medium');
  const [color, setColor] = useState('white');

  return (
    <div className="absolute top-10 right-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Customize Your Ezyloft</h2>
      <div className="mb-4">
        <label className="block mb-2">Size:</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Color:</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="wood">Wood</option>
        </select>
      </div>
    </div>
  );
}

export default CustomizationPanel;