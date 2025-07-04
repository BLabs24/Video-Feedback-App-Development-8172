import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiVideo, FiBarChart3, FiStar } = FiIcons;

const Navigation = ({ currentPage, setCurrentPage }) => {
  const location = useLocation();

  const navItems = [
    { id: 'landing', path: '/', icon: FiHome, label: 'Home' },
    { id: 'feedback', path: '/feedback', icon: FiVideo, label: 'Feedback' },
    { id: 'dashboard', path: '/dashboard', icon: FiBarChart3, label: 'Dashboard' },
  ];

  return (
    <motion.nav 
      className="bg-secondary border-b border-accent"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-red to-orange rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiStar} className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red to-orange bg-clip-text text-transparent">
                YTF
              </span>
            </motion.div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setCurrentPage(item.id)}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-accent text-white'
                      : 'text-muted hover:text-white hover:bg-accent/50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span className="hidden sm:block font-medium">{item.label}</span>
                </motion.div>
                
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red to-orange"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;