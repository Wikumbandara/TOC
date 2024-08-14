import React, { useState } from 'react';

const Drawer = () => {
  const [squares, setSquares] = useState(Array(9).fill(false));

  const toggleSquare = (index) => {
    const newSquares = [...squares];
    newSquares[index] = !newSquares[index];
    setSquares(newSquares);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-3 gap-4">
        {squares.map((isOpen, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-24 h-24 border border-white cursor-pointer transition-colors duration-300 
            ${isOpen ? 'bg-white text-[#3D4E8B]' : 'bg-[#3D4E8B] text-white'}`}
            onClick={() => toggleSquare(index)}
          >
            {isOpen ? `A${index + 1}` : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drawer;
