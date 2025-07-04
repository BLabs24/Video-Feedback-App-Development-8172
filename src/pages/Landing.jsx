import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlay, FiBookmark, FiTrendingUp, FiZap, FiStar, FiArrowRight } = FiIcons;

const Landing = ({ setCurrentPage }) => {
  const bookmarkletCode = `javascript:(function(){
    var currentTime = Math.floor(document.querySelector('video')?.currentTime || 0);
    var videoURL = window.location.href.split('&')[0];
    var ytfURL = window.location.origin + '/#/feedback?video=' + encodeURIComponent(videoURL) + '&t=' + currentTime;
    window.open(ytfURL, '_blank');
  })();`;

  const features = [
    {
      icon: FiPlay,
      title: 'Smart Video Analysis',
      description: 'Automatically detects timestamps and provides context-aware feedback options',
      gradient: 'from-red to-orange'
    },
    {
      icon: FiBookmark,
      title: 'Save for Later',
      description: 'Bookmark important moments and create your personal highlight reel',
      gradient: 'from-green to-blue'
    },
    {
      icon: FiTrendingUp,
      title: 'Trending Insights',
      description: 'Discover what moments resonate most with viewers across the platform',
      gradient: 'from-purple to-red'
    },
    {
      icon: FiZap,
      title: 'One-Click Feedback',
      description: 'Use our bookmarklet to instantly provide feedback while watching any video',
      gradient: 'from-orange to-green'
    }
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red/10 via-orange/10 to-green/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center space-x-3 mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red to-orange rounded-2xl flex items-center justify-center">
                <SafeIcon icon={FiStar} className="text-white text-3xl" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-red via-orange to-green bg-clip-text text-transparent">
                YTF
              </h1>
            </motion.div>
            
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Watch Smart.{' '}
              <span className="bg-gradient-to-r from-red to-orange bg-clip-text text-transparent">
                Not Blind.
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-muted mb-8 max-w-2xl mx-auto"
            >
              Transform your video watching experience with timestamped feedback. 
              React, comment, and discover the moments that matter most.
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/feedback"
                onClick={() => setCurrentPage('feedback')}
                className="group"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red to-orange text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  <SafeIcon icon={FiPlay} className="text-xl" />
                  <span>Start Watching</span>
                  <SafeIcon icon={FiArrowRight} className="text-xl group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link
                to="/dashboard"
                onClick={() => setCurrentPage('dashboard')}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg border border-accent hover:bg-accent transition-all duration-300"
                >
                  View Dashboard
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 bg-secondary/50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose YTF?
            </h3>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Experience video feedback like never before with our intelligent features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="card-hover"
              >
                <div className="bg-accent rounded-2xl p-6 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    <SafeIcon icon={feature.icon} className="text-white text-2xl" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Bookmarklet Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              💬 1-Click Feedback Tool
            </h3>
            <p className="text-xl text-muted mb-8">
              Drag this bookmarklet to your bookmarks bar for instant feedback while watching any video
            </p>
          </div>
          
          <div className="gradient-border">
            <div className="gradient-border-content">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-semibold text-white mb-4">
                  📎 YTF Quick Feedback
                </h4>
                <p className="text-muted mb-6">
                  Drag the button below to your bookmarks bar, then click it while watching any video to instantly open YTF with that video and timestamp.
                </p>
              </div>
              
              <div className="flex justify-center mb-6">
                <motion.a
                  href={bookmarkletCode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red to-orange text-white px-6 py-3 rounded-lg font-semibold text-lg flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
                  draggable="true"
                >
                  <SafeIcon icon={FiZap} className="text-xl" />
                  <span>YTF Quick Feedback</span>
                </motion.a>
              </div>
              
              <div className="bg-primary/50 rounded-lg p-4">
                <h5 className="font-semibold text-white mb-2">How to use:</h5>
                <ol className="text-muted space-y-1 text-sm">
                  <li>1. Drag the button above to your bookmarks bar</li>
                  <li>2. Go to any video (YouTube, TikTok, Instagram, etc.)</li>
                  <li>3. Click the bookmarklet while watching</li>
                  <li>4. YTF opens with your video and current timestamp</li>
                  <li>5. Add your emoji reaction and comment instantly!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-red/20 via-orange/20 to-green/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Video Experience?
          </h3>
          <p className="text-xl text-muted mb-8">
            Join thousands of smart viewers who are already using YTF to enhance their video watching
          </p>
          
          <Link
            to="/feedback"
            onClick={() => setCurrentPage('feedback')}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red to-orange text-white px-12 py-4 rounded-xl font-semibold text-xl flex items-center space-x-2 mx-auto hover:shadow-lg transition-all duration-300"
            >
              <SafeIcon icon={FiPlay} className="text-2xl" />
              <span>Get Started Now</span>
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Landing;