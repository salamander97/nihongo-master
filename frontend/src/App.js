import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import './assets/css/styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="register" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;