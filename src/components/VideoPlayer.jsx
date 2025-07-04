import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VideoPlayer = ({ url, startTime = 0, onTimeUpdate }) => {
  const [embedUrl, setEmbedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) return;

    setIsLoading(true);
    setError('');

    try {
      const processedUrl = processVideoUrl(url, startTime);
      setEmbedUrl(processedUrl);
    } catch (err) {
      setError('Invalid video URL. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [url, startTime]);

  const processVideoUrl = (url, startTime) => {
    // YouTube
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      let videoId = '';
      
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        videoId = urlParams.get('v');
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      }
      
      if (!videoId) throw new Error('Invalid YouTube URL');
      
      return `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1`;
    }
    
    // For other platforms, we'll show a placeholder
    // In a real app, you'd integrate with their respective APIs
    return null;
  };

  if (isLoading) {
    return (
      <div className="video-container bg-secondary rounded-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loading-spinner" />
          <span className="ml-3 text-muted">Loading video...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-container bg-secondary rounded-2xl">
        <div className="absolute inset-0 flex items-center justify-center text-center p-8">
          <div>
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Video Error</h3>
            <p className="text-muted">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!embedUrl) {
    // For non-YouTube videos, show a placeholder with link
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="video-container bg-secondary rounded-2xl"
      >
        <div className="absolute inset-0 flex items-center justify-center text-center p-8">
          <div>
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Video Preview</h3>
            <p className="text-muted mb-6">
              This video platform is not directly supported for embedding.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(url, '_blank')}
              className="bg-gradient-to-r from-red to-orange text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Watch on Original Platform
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="video-container"
    >
      <iframe
        src={embedUrl}
        title="Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-2xl"
      />
    </motion.div>
  );
};

export default VideoPlayer;