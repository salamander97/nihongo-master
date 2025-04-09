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
<<<<<<< Updated upstream
=======
          
          {/* Thêm routes mới cho JLPT */}
          <Route path="courses/n5" element={<JLPTLevelPage level="N5" />} />
          <Route path="courses/n4" element={<JLPTLevelPage level="N4" />} />
          <Route path="courses/n3" element={<JLPTLevelPage level="N3" />} />
          <Route path="courses/n2" element={<JLPTLevelPage level="N2" />} />
          <Route path="courses/n1" element={<JLPTLevelPage level="N1" />} />
>>>>>>> Stashed changes
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;