import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import TopRated from "./components/TopRated";
import UpComming from './components/UpComming';
import SingleMovie from './components/SingleMovie';


import NotFound from './components/NotFound';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/upcomming" element={<UpComming />} />
          <Route path="/movies/:id" element={<SingleMovie />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
