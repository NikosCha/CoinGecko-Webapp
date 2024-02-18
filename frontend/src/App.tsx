import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataTable from './DataTable';
import CoinProfile from './CoinProfile';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/coin/:id" element={<CoinProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
