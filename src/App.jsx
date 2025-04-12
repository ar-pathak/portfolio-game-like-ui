import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Components
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';

// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
  overflow: hidden;
  position: relative;
`;

const PageContainer = styled.div`
  padding-top: 80px; /* Space for fixed navigation */
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 136, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(0, 255, 136, 0.5);
    }
  }
`;

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <AppContainer>
        <ParticleBackground />
        <Navigation />
        <PageContainer>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </PageContainer>
      </AppContainer>
    </Router>
  );
}

export default App; 