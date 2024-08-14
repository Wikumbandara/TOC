import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DrawerPage from './pages/DrawerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drawer" element={<DrawerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
