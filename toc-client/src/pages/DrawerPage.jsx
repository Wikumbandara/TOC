import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebase';
import TeamList from '../components/TeamList';
import Group from '../components/Group';
import Drawer from '../components/Drawer';
import { teamsList } from '../components/TeamsData';
import { useNavigate } from 'react-router-dom';

const groupsInitialState = {
  A: Array(4).fill(null),
  B: Array(4).fill(null),
  C: Array(4).fill(null),
  D: Array(4).fill(null),
  E: Array(4).fill(null),
  F: Array(4).fill(null)
};

const DrawerPage = () => {
  const [groups, setGroups] = useState(groupsInitialState);
  const [availableTeams, setAvailableTeams] = useState(teamsList);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false); 
  const groupsDocId = "tournament_groups"; 
  const finalGroupsDocId = "final_groups"; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const docRef = doc(db, 'tournaments', groupsDocId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedGroups = docSnap.data().groups || groupsInitialState;
          setGroups(fetchedGroups);

          // Update available teams based on assigned groups
          const assignedTeams = Object.values(fetchedGroups).flat().filter(team => team !== null);
          setAvailableTeams(teamsList.filter(team => !assignedTeams.some(t => t.name === team.name)));
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching groups: ', error);
      }
    };

    fetchGroups();
  }, []);

  const handleDrop = async (e, group, index) => {
    e.preventDefault();
    if (selectedTeam) {
      const newGroups = { ...groups };
      const groupTeams = newGroups[group];

      if (groupTeams[index] !== null) {
        setAvailableTeams([...availableTeams, groupTeams[index]]);
      }

      groupTeams[index] = selectedTeam;
      newGroups[group] = groupTeams;

      setAvailableTeams(availableTeams.filter(team => team.name !== selectedTeam.name));

      await setDoc(doc(db, 'tournaments', groupsDocId), { groups: newGroups });

      setGroups(newGroups);
      setSelectedTeam(null);
      setDragging(false);
    }
  };

  const handleRemove = async (group, index) => {
    const newGroups = { ...groups };
    const removedTeam = newGroups[group][index];
    if (removedTeam) {
      setAvailableTeams([...availableTeams, removedTeam]);
      newGroups[group][index] = null;

      await setDoc(doc(db, 'tournaments', groupsDocId), { groups: newGroups });

      setGroups(newGroups);
    }
  };

  const handleDragStart = (team) => {
    setSelectedTeam(team);
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleComplete = async () => {
    setLoading(true); 
    try {
      await setDoc(doc(db, 'tournaments', finalGroupsDocId), { groups });
      console.log('Final groups saved to Firestore');
      navigate('/groups'); 
    } catch (error) {
      console.error('Error saving final groups: ', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Overview of the Tournament Draw Process</h2>
        <Drawer />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Available Teams</h2>
        <TeamList teams={availableTeams} onDragStart={handleDragStart} />
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Group Composition</h2>
        <div className="flex flex-wrap justify-around gap-4">
          {Object.keys(groups).map((group) => (
            <Group
              key={group}
              groupName={group}
              groupTeams={groups[group]}
              onDrop={(e, index) => handleDrop(e, group, index)}
              onDragOver={handleDragOver}
              onRemove={(index) => handleRemove(group, index)}
              isDragging={dragging}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleComplete}
          className="px-4 py-2 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-600"
          disabled={loading} 
        >
          {loading ? 'Processing...' : 'Complete'}
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default DrawerPage;
