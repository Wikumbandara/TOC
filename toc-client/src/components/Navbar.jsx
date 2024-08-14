import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <nav className="bg-[#0e1941] text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">TOC 24</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">Drawer</Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-300">Available Teams</Link>
          </li>
          <li>
            <Link to="/groups" className="hover:text-gray-300">Groups</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
