import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link to="/drawer" className="text-lg font-bold text-[#3D4E8B]">
        Go to Drawer
      </Link>
    </div>
  );
};

export default Home;
