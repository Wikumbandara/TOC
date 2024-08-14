import React from 'react';

const TeamList = ({ teams, onDragStart }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {teams.map((team, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer p-2 border rounded-lg shadow-sm hover:bg-gray-200"
            draggable
            onDragStart={() => onDragStart(team)}
          >
            <img src={team.logo} alt={`${team.name} logo`} className="w-12 h-12 mr-3" />
            <span className="text-lg font-semibold">{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
