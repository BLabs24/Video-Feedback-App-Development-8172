import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useFeedback } from '../context/FeedbackContext';
import VideoPlayer from '../components/VideoPlayer';
import EmojiReactions from '../components/EmojiReactions';

const { FiLink, FiSend, FiBookmark, FiCheck, FiAlertCircle } = FiIcons;

const VideoFeedback = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { addFeedback, addToWatchLater } = useFeedback();

  useEffect(() => {
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const videoParam = urlParams.get('video');
    const timeParam = urlParams.get('t');
    
    if (videoParam) {
      setVideoUrl(videoParam);
    }
    if (timeParam) {
      setCurrentTime(parseInt(timeParam));
    }
  }, []);

  const extractTimestamp = (url) => {
    const timestampRegex = /[?&]t=(\d+)/;
    const match = url.match(timestampRegex);
    return match ? parseInt(match[1]) : 0;
  };

  const handleUrlSubmit = () => {
    if (!videoUrl.trim()) {
      setErrorMessage('Please enter a video URL');
      setShowError(true);
      return;
    }

    const timestamp = extractTimestamp(videoUrl);
    if (timestamp > 0) {
      setCurrentTime(timestamp);
    }

    setShowError(false);
  };

  const handleSubmitFeedback = async () => {
    if (!videoUrl.trim()) {
      setErrorMessage('Please enter a video URL');
      setShowError(true);
      return;
    }

    if (!selectedEmoji) {
      setErrorMessage('Please select an emoji reaction');
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);

    try {
      const feedback = {
        videoUrl,
        timestamp: currentTime,
        emoji: selectedEmoji,
        comment: comment.trim(),
        videoTitle: extractVideoTitle(videoUrl),
      };

      await addFeedback(feedback);
      
      // Reset form
      setSelectedEmoji('');
      setComment('');
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrorMessage('Failed to submit feedback. Please try again.');
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveForLater = () => {
    if (!videoUrl.trim()) {
      setErrorMessage('Please enter a video URL');
      setShowError(true);
      return;
    }

    const item = {
      videoUrl,
      timestamp: currentTime,
      videoTitle: extractVideoTitle(videoUrl),
      note: comment.trim() || 'Saved for later viewing',
    };

    addToWatchLater(item);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const extractVideoTitle = (url) => {
    // Simple title extraction - in a real app, you'd use the video platform's API
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'YouTube Video';
    } else if (url.includes('tiktok.com')) {
      return 'TikTok Video';
    } else if (url.includes('instagram.com')) {
      return 'Instagram Video';
    }
    return 'Video';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-primary py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Watch Smart.{' '}
            <span className="bg-gradient-to-r from-red to-orange bg-clip-text text-transparent">
              Not Blind.
            </span>
          </h1>
          <p className="text-xl text-muted">
            Share your thoughts at the perfect moment
          </p>
        </motion.div>

        {/* Video URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-secondary rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center space-x-2 mb-4">
            <SafeIcon icon={FiLink} className="text-red text-xl" />
            <h3 className="text-xl font-semibold text-white">Video URL</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste your video URL here (YouTube, TikTok, Instagram, etc.)"
              className="flex-1 bg-accent text-white placeholder-muted px-4 py-3 rounded-xl border border-accent focus:border-red focus:outline-none transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUrlSubmit}
              className="bg-gradient-to-r from-red to-orange text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Load Video
            </motion.button>
          </div>
          
          {currentTime > 0 && (
            <div className="mt-4 text-sm text-muted">
              <span className="bg-accent px-2 py-1 rounded">
                Starting at {formatTime(currentTime)}
              </span>
            </div>
          )}
        </motion.div>

        {/* Video Player */}
        {videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-8"
          >
            <VideoPlayer 
              url={videoUrl} 
              startTime={currentTime}
              onTimeUpdate={setCurrentTime}
            />
          </motion.div>
        )}

        {/* Feedback Section */}
        {videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-secondary rounded-2xl p-6 mb-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              How do you feel about this moment?
            </h3>
            
            <EmojiReactions
              selectedEmoji={selectedEmoji}
              onEmojiSelect={setSelectedEmoji}
            />
            
            <div className="mt-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your thoughts (optional)..."
                className="w-full bg-accent text-white placeholder-muted px-4 py-3 rounded-xl border border-accent focus:border-red focus:outline-none transition-colors resize-none"
                rows="4"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitFeedback}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-red to-orange text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="loading-spinner" />
                ) : (
                  <>
                    <SafeIcon icon={FiSend} className="text-xl" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveForLater}
                className="bg-accent text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-accent/80 transition-all duration-300"
              >
                <SafeIcon icon={FiBookmark} className="text-xl" />
                <span>Save for Later</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Success/Error Messages */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg z-50"
          >
            <SafeIcon icon={FiCheck} className="text-xl" />
            <span>Success! Your feedback has been saved.</span>
          </motion.div>
        )}

        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-red text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg z-50"
          >
            <SafeIcon icon={FiAlertCircle} className="text-xl" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VideoFeedback;