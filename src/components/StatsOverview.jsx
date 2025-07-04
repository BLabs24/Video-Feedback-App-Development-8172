import React from 'react';
import { motion } from 'framer-motion';
import { useFeedback } from '../context/FeedbackContext';

const StatsOverview = () => {
  const { feedbacks, watchLater, getEmojiStats } = useFeedback();
  const emojiStats = getEmojiStats();

  const stats = [
    {
      label: 'Total Feedback',
      value: feedbacks.length,
      emoji: '💬',
      color: 'from-blue to-purple'
    },
    {
      label: 'Watch Later',
      value: watchLater.length,
      emoji: '📚',
      color: 'from-green to-blue'
    },
    {
      label: 'Great Moments',
      value: emojiStats['🔥'],
      emoji: '🔥',
      color: 'from-red to-orange'
    },
    {
      label: 'Insights',
      value: emojiStats['💡'],
      emoji: '💡',
      color: 'from-yellow-400 to-orange'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
          className="bg-secondary rounded-2xl p-6 text-center card-hover"
        >
          <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
            {stat.emoji}
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-muted">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsOverview;