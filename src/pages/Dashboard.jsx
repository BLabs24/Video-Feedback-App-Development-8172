import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useFeedback } from '../context/FeedbackContext';
import FeedbackCard from '../components/FeedbackCard';
import StatsOverview from '../components/StatsOverview';

const { FiMessageSquare, FiBookmark, FiTrendingUp, FiFilter } = FiIcons;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('feedback');
  const [filterEmoji, setFilterEmoji] = useState('');
  const { feedbacks, watchLater, getEmojiStats } = useFeedback();

  const tabs = [
    { id: 'feedback', label: 'My Feedback', icon: FiMessageSquare, count: feedbacks.length },
    { id: 'watchLater', label: 'Watch Later', icon: FiBookmark, count: watchLater.length },
    { id: 'trending', label: 'Trending', icon: FiTrendingUp, count: 0 },
  ];

  const emojiFilters = [
    { emoji: '', label: 'All' },
    { emoji: '🔥', label: 'Great' },
    { emoji: '💡', label: 'Insightful' },
    { emoji: '❌', label: 'Useless' },
    { emoji: '🤔', label: 'Confusing' },
    { emoji: '💤', label: 'Boring' },
  ];

  const filteredFeedbacks = filterEmoji 
    ? feedbacks.filter(f => f.emoji === filterEmoji)
    : feedbacks;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feedback':
        return (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiFilter} className="text-red text-xl" />
                <h3 className="text-lg font-semibold text-white">Filter by Reaction</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {emojiFilters.map((filter) => (
                  <motion.button
                    key={filter.emoji}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilterEmoji(filter.emoji)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      filterEmoji === filter.emoji
                        ? 'bg-red text-white'
                        : 'bg-accent text-muted hover:text-white hover:bg-accent/80'
                    }`}
                  >
                    {filter.emoji && <span className="text-lg mr-2">{filter.emoji}</span>}
                    {filter.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Feedback Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback) => (
                  <FeedbackCard key={feedback.id} feedback={feedback} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">🎬</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">No feedback yet</h3>
                  <p className="text-muted">
                    {filterEmoji ? `No ${emojiFilters.find(f => f.emoji === filterEmoji)?.label.toLowerCase()} reactions found` : 'Start watching videos and sharing your thoughts!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'watchLater':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchLater.length > 0 ? (
                watchLater.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary rounded-2xl p-6 card-hover"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">{item.videoTitle}</h4>
                      <span className="text-sm text-muted bg-accent px-2 py-1 rounded">
                        {formatTime(item.timestamp)}
                      </span>
                    </div>
                    <p className="text-muted mb-4">{item.note}</p>
                    <div className="flex items-center justify-between text-sm text-muted">
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(item.videoUrl, '_blank')}
                        className="text-red hover:text-orange transition-colors"
                      >
                        Watch Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">No saved videos</h3>
                  <p className="text-muted">Videos you save for later will appear here</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'trending':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold text-white mb-2">Coming Soon</h3>
            <p className="text-muted">Trending segments feature will be available soon!</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your{' '}
            <span className="bg-gradient-to-r from-red to-orange bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-muted">
            Track your feedback and discover insights
          </p>
        </motion.div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-secondary rounded-2xl p-2 mb-8"
        >
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-red text-white'
                    : 'text-muted hover:text-white hover:bg-accent/50'
                }`}
              >
                <SafeIcon icon={tab.icon} className="text-xl" />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="bg-accent text-white text-sm px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;