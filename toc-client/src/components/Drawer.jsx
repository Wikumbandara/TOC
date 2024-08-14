import React, { useState, useEffect } from 'react';
import placeholderImage from '../assets/logo.jpg'; 

// Function to generate shuffled labels
const generateShuffledLabels = () => {
  const letters = 'ABCDEF'; // Letters from A to F
  const cols = 4; // Number of columns for each letter (1-4)
  const labels = [];

  for (let i = 0; i < letters.length; i++) {
    for (let j = 1; j <= cols; j++) {
      labels.push(`${letters[i]}${j}`);
    }
  }

  // Shuffle the labels
  for (let i = labels.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [labels[i], labels[j]] = [labels[j], labels[i]];
  }

  return labels;
};

const Drawer = () => {
  const [squares, setSquares] = useState(Array(24).fill(false));
  const [shuffledLabels, setShuffledLabels] = useState([]);

  useEffect(() => {
    // Retrieve shuffled labels and squares state from localStorage
    const savedLabels = localStorage.getItem('shuffledLabels');
    const savedSquares = localStorage.getItem('squaresState');

    if (savedLabels) {
      setShuffledLabels(JSON.parse(savedLabels));
    } else {
      const newLabels = generateShuffledLabels();
      setShuffledLabels(newLabels);
      localStorage.setItem('shuffledLabels', JSON.stringify(newLabels));
    }

    if (savedSquares) {
      setSquares(JSON.parse(savedSquares));
    } else {
      localStorage.setItem('squaresState', JSON.stringify(Array(24).fill(false)));
    }
  }, []);

  const toggleSquare = (index) => {
    const newSquares = [...squares];
    newSquares[index] = !newSquares[index];
    setSquares(newSquares);
    localStorage.setItem('squaresState', JSON.stringify(newSquares)); // Save state to localStorage
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <div className="grid grid-cols-6 gap-4">
        {squares.map((isOpen, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-center w-28 h-28 border border-gray-300 cursor-pointer transition-transform duration-300 transform rounded-lg shadow-md 
            ${isOpen ? 'bg-white text-[#3D4E8B]' : 'bg-[#3D4E8B] text-white'} hover:scale-105`}
            onClick={() => toggleSquare(index)}
            aria-label={`Square ${shuffledLabels[index]} ${isOpen ? 'active' : 'inactive'}`}
          >
            {isOpen ? (
              <span className="text-lg font-semibold">{shuffledLabels[index]}</span>
            ) : (
              <img 
                src={placeholderImage} 
                alt="Placeholder" 
                className="w-full h-full object-cover rounded-lg" 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drawer;
