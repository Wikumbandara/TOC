import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebase'; // Ensure your Firebase configuration is correctly imported

const FinalGroups = () => {
  const [finalGroups, setFinalGroups] = useState({});
  const documentId = "final_groups"; // Document ID in the tournaments collection

  useEffect(() => {
    const fetchFinalGroups = async () => {
      try {
        const docRef = doc(db, 'tournaments', documentId);
        console.log('Fetching document from:', docRef.path); // Log document path
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data()); // Log document data
          setFinalGroups(docSnap.data().groups || {});
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching final groups: ', error);
      }
    };

    fetchFinalGroups();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Final Group Composition</h1>
      <div className="flex flex-wrap justify-around gap-4">
        {Object.keys(finalGroups).length > 0 ? (
          Object.keys(finalGroups).map((groupKey) => (
            <div key={groupKey} className="p-4 border border-gray-300 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white">
              <h2 className="text-xl font-bold mb-4 text-gray-700 border-b border-gray-300 pb-2">{groupKey}</h2>
              <ul>
                {finalGroups[groupKey].map((team, index) => (
                  <li key={index} className="flex items-center gap-2 mb-2">
                    <img src={team.logo} alt={team.name} className="w-12 h-12 rounded-full border border-gray-300" />
                    <p className="font-medium text-gray-800">{team.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default FinalGroups;
