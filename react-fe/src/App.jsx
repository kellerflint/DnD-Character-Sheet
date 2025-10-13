// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage';
import NotFound from './pages/NotFound';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* routes for home page, characters, and unknown page wildcard */}
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App