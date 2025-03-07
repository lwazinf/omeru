'use client';

import React from 'react';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#111111] bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1a1a1a] rounded-lg p-8 shadow-lg border border-white/10 flex flex-col items-center"
      >
        <LoadingSpinner size="lg" color="primary" className="mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-lg font-medium"
        >
          Loading experience...
        </motion.p>
      </motion.div>
    </div>
  );
} 