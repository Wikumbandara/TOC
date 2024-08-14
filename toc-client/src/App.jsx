import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrawerPage from './pages/DrawerPage';
import Navbar from './components/Navbar'; 
import FinalGroups from './pages/FinalGroups';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<DrawerPage />} />
          <Route path="/groups" element={<FinalGroups />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
