import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebase';

const FinalGroups = () => {
  const [finalGroups, setFinalGroups] = useState({});
  const documentId = "final_groups"; // Document ID in the tournaments collection

  useEffect(() => {
    const fetchFinalGroups = async () => {
      try {
        const docRef = doc(db, 'tournaments', documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
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

  // Sort groups by keys in ascending order
  const sortedGroupKeys = Object.keys(finalGroups).sort();

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Final Group Composition</h1>
      {sortedGroupKeys.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedGroupKeys.map((groupKey) => (
            <div key={groupKey} className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700">{groupKey}</h2>
              </div>
              <div className="p-4">
                <table className="w-full divide-y divide-gray-200">
                  <tbody>
                    {finalGroups[groupKey].map((team, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {`A${index + 1}`} - {team?.name || 'Unknown Team'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No data available.</p>
      )}
    </div>
  );
};

export default FinalGroups;
