import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import VideoFeedback from './pages/VideoFeedback';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import { FeedbackProvider } from './context/FeedbackContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    // Check if there's a video URL in query params
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('video');
    if (videoUrl) {
      setCurrentPage('feedback');
    }
  }, []);

  return (
    <FeedbackProvider>
      <Router>
        <div className="min-h-screen bg-primary text-text font-inter">
          <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
          
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Landing setCurrentPage={setCurrentPage} />
                  </motion.div>
                } 
              />
              <Route 
                path="/feedback" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VideoFeedback />
                  </motion.div>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboard />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;