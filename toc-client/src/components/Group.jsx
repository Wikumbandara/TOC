import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'; // Import TrashIcon from Heroicons

const Group = ({ groupName, groupTeams, onDrop, onDragOver, onRemove, isDragging }) => {
  return (
    <div
      className="group p-4 border border-gray-300 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white overflow-auto"
      onDragOver={onDragOver}
    >
      <h3 className="text-xl font-bold mb-4 text-gray-700 border-b border-gray-300 pb-2">{groupName}</h3>
      <div className="team-list grid grid-cols-1 gap-4">
        {groupTeams.map((team, index) => {
          const slotId = `${groupName}${index + 1}`; // Create slot ID like A1, A2, etc.
          return (
            <div
              key={slotId}
              className={`team-item p-2 border border-gray-200 rounded-md flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-100 transition-colors ${isDragging ? 'bg-yellow-100' : ''}`}
              onDrop={(e) => onDrop(e, index)} // Handle drop for specific slot
              onDragOver={onDragOver}
            >
              {team ? (
                <>
                  <div className="flex items-center gap-2 flex-grow min-w-0">
                    <img src={team.logo} alt={team.name} className="team-logo w-12 h-12 rounded-full border border-gray-300" />
                    <p className="team-name font-medium text-gray-800 overflow-hidden overflow-ellipsis whitespace-nowrap">{team.name}</p> {/* Handle overflow */}
                  </div>
                  <button
                    className="ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => onRemove(index)} // Handle remove action
                  >
                    <TrashIcon className="w-6 h-6" /> {/* Trash icon */}
                  </button>
                </>
              ) : (
                <p className="text-gray-500 truncate">Empty Slot {slotId}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Group;
