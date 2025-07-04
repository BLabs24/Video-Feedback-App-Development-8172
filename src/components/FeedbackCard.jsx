import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useFeedback } from '../context/FeedbackContext';

const { FiTrash2, FiExternalLink, FiClock } = FiIcons;

const FeedbackCard = ({ feedback }) => {
  const { removeFeedback } = useFeedback();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      removeFeedback(feedback.id);
    }
  };

  const handleOpenVideo = () => {
    const urlWithTime = `${feedback.videoUrl}${feedback.videoUrl.includes('?') ? '&' : '?'}t=${feedback.timestamp}`;
    window.open(urlWithTime, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-secondary rounded-2xl p-6 card-hover"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{feedback.emoji}</div>
          <div>
            <h4 className="text-lg font-semibold text-white">{feedback.videoTitle}</h4>
            <div className="flex items-center space-x-2 text-sm text-muted">
              <SafeIcon icon={FiClock} className="text-xs" />
              <span>{formatTime(feedback.timestamp)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpenVideo}
            className="text-muted hover:text-white transition-colors"
            title="Open video at this timestamp"
          >
            <SafeIcon icon={FiExternalLink} className="text-lg" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            className="text-muted hover:text-red transition-colors"
            title="Delete feedback"
          >
            <SafeIcon icon={FiTrash2} className="text-lg" />
          </motion.button>
        </div>
      </div>

      {/* Comment */}
      {feedback.comment && (
        <div className="mb-4">
          <p className="text-muted leading-relaxed">{feedback.comment}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-muted pt-4 border-t border-accent">
        <span>{formatDate(feedback.timestamp)}</span>
        <span className="bg-accent px-2 py-1 rounded text-xs">
          {feedback.videoUrl.includes('youtube.com') ? 'YouTube' : 
           feedback.videoUrl.includes('tiktok.com') ? 'TikTok' : 
           feedback.videoUrl.includes('instagram.com') ? 'Instagram' : 'Video'}
        </span>
      </div>
    </motion.div>
  );
};

export default FeedbackCard;