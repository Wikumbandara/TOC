import React from 'react';
import Drawer from '../components/Drawer';
import { Link } from 'react-router-dom';

const DrawerPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Drawer />
      <Link to="/" className="mt-4 text-lg font-bold text-[#3D4E8B]">
        Back to Home
      </Link>
    </div>
  );
};

export default DrawerPage;
