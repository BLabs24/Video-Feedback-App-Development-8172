import React, { createContext, useContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    // Load data from localStorage on mount
    const storedFeedbacks = localStorage.getItem('ytf_feedbacks');
    const storedWatchLater = localStorage.getItem('ytf_watch_later');
    
    if (storedFeedbacks) {
      setFeedbacks(JSON.parse(storedFeedbacks));
    }
    if (storedWatchLater) {
      setWatchLater(JSON.parse(storedWatchLater));
    }
  }, []);

  const addFeedback = (feedback) => {
    const newFeedback = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...feedback
    };
    
    const updatedFeedbacks = [...feedbacks, newFeedback];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('ytf_feedbacks', JSON.stringify(updatedFeedbacks));
    
    return newFeedback;
  };

  const addToWatchLater = (item) => {
    const newItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...item
    };
    
    const updatedWatchLater = [...watchLater, newItem];
    setWatchLater(updatedWatchLater);
    localStorage.setItem('ytf_watch_later', JSON.stringify(updatedWatchLater));
    
    return newItem;
  };

  const removeFeedback = (id) => {
    const updatedFeedbacks = feedbacks.filter(f => f.id !== id);
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('ytf_feedbacks', JSON.stringify(updatedFeedbacks));
  };

  const removeFromWatchLater = (id) => {
    const updatedWatchLater = watchLater.filter(w => w.id !== id);
    setWatchLater(updatedWatchLater);
    localStorage.setItem('ytf_watch_later', JSON.stringify(updatedWatchLater));
  };

  const getEmojiStats = () => {
    const stats = {
      '🔥': feedbacks.filter(f => f.emoji === '🔥').length,
      '💡': feedbacks.filter(f => f.emoji === '💡').length,
      '❌': feedbacks.filter(f => f.emoji === '❌').length,
      '🤔': feedbacks.filter(f => f.emoji === '🤔').length,
      '💤': feedbacks.filter(f => f.emoji === '💤').length,
    };
    return stats;
  };

  const value = {
    feedbacks,
    watchLater,
    addFeedback,
    addToWatchLater,
    removeFeedback,
    removeFromWatchLater,
    getEmojiStats,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};