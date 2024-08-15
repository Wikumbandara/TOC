import React, { useState, useEffect } from 'react';
import placeholderImage from '../assets/logo.jpg'; 

// Function to generate specific label sets and shuffle them
const generateShuffledLabels = () => {
  const labelsSet1 = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1'];
  const labelsSet2 = ['A2', 'B2', 'C2', 'D2'];
  const allLabels = [];

  // Generate all possible labels from A1 to H3
  for (let i = 1; i <= 3; i++) {
    for (let j = 0; j < 8; j++) {
      allLabels.push(`${'ABCDEFGH'[j]}${i}`);
    }
  }

  // Filter out labels that are already used in labelsSet1 and labelsSet2
  const remainingLabels = allLabels.filter(
    (label) => !labelsSet1.includes(label) && !labelsSet2.includes(label)
  );

  // Shuffle the label sets
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffleArray(labelsSet1);
  shuffleArray(labelsSet2);
  shuffleArray(remainingLabels);

  // Combine the sets with specific positions for each label set
  return [
    ...labelsSet1.slice(0, 8), // First 8 boxes (A1 to H1)
    ...labelsSet2.slice(0, 4), // Next 4 boxes (A2 to D2)
    ...remainingLabels.slice(0, 12), // Remaining boxes (random selection)
  ];
};

const Drawer = () => {
  const [squares, setSquares] = useState(Array(24).fill(false));
  const [shuffledLabels, setShuffledLabels] = useState([]);

  useEffect(() => {
    // Generate shuffled labels and reset squares state on component mount
    const newLabels = generateShuffledLabels();
    setShuffledLabels(newLabels);
    setSquares(Array(24).fill(false)); // Reset squares to initial state
  }, []);

  const toggleSquare = (index) => {
    const newSquares = [...squares];
    newSquares[index] = !newSquares[index];
    setSquares(newSquares);
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
