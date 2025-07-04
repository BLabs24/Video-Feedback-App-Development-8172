import React from 'react';
import { motion } from 'framer-motion';

const EmojiReactions = ({ selectedEmoji, onEmojiSelect }) => {
  const reactions = [
    { emoji: '🔥', label: 'Great', color: 'from-red to-orange' },
    { emoji: '💡', label: 'Insightful', color: 'from-yellow-400 to-orange' },
    { emoji: '❌', label: 'Useless', color: 'from-red-500 to-red-600' },
    { emoji: '🤔', label: 'Confusing', color: 'from-purple to-blue' },
    { emoji: '💤', label: 'Boring', color: 'from-gray-400 to-gray-500' },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {reactions.map((reaction, index) => (
        <motion.button
          key={reaction.emoji}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEmojiSelect(reaction.emoji)}
          className={`emoji-button flex flex-col items-center p-4 rounded-2xl transition-all duration-200 ${
            selectedEmoji === reaction.emoji
              ? 'selected bg-accent/50 border-2 border-red'
              : 'bg-accent hover:bg-accent/80 border-2 border-transparent'
          }`}
        >
          <div className="text-4xl mb-2">{reaction.emoji}</div>
          <span className="text-sm font-medium text-white">{reaction.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default EmojiReactions;