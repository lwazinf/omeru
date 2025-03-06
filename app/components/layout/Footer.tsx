'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import AnimatedElement from '../ui/AnimatedElement';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  // Add theme state that syncs with the app's theme
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Effect to detect theme from body class
  useEffect(() => {
    const detectTheme = () => {
      if (typeof document !== 'undefined') {
        if (document.body.classList.contains('theme-light')) {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      }
    };
    
    // Set initial theme
    detectTheme();
    
    // Create an observer to watch for class changes on body
    const observer = new MutationObserver(detectTheme);
    if (typeof document !== 'undefined') {
      observer.observe(document.body, { 
        attributes: true, 
        attributeFilter: ['class'] 
      });
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };
  
  const iconHoverVariants = {
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };
  
  // Theme-based style variables
  const themeStyles = {
    dark: {
      bg: 'bg-[#111111]',
      text: 'text-white',
      textSecondary: 'text-white/60',
      textTertiary: 'text-white/40',
      border: 'border-white/10',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-blue-500',
      iconColor: 'text-white/70 hover:text-white',
      linkHover: 'hover:text-white',
      decorativeBg: 'bg-blue-500/5',
    },
    light: {
      bg: 'bg-[#F2E8DD]',
      text: 'text-[#00452E]',
      textSecondary: 'text-[#666]',
      textTertiary: 'text-[#999]',
      border: 'border-[#00452E]/10',
      gradientFrom: 'from-[#00452E]',
      gradientTo: 'to-[#E4CBA5]',
      iconColor: 'text-[#00452E]/70 hover:text-[#00452E]',
      linkHover: 'hover:text-[#00452E]',
      decorativeBg: 'bg-[#00452E]/5',
    }
  };
  
  // Current theme styling
  const ts = themeStyles[theme];
  
  return (
    <footer className={`${ts.bg} ${ts.text} py-16 px-6 md:px-12 relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className={`absolute top-0 right-0 w-80 h-80 rounded-full ${ts.decorativeBg} blur-3xl -z-0`} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#E4CBA5]/10 blur-3xl -z-0" />
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5 pattern-overlay"></div>
      
      {/* Decorative elements */}
      <div className={`absolute top-20 left-20 h-px w-20 ${ts.border}`} />
      <div className={`absolute bottom-32 right-20 h-px w-40 ${ts.border}`} />
      <div className={`absolute top-1/3 right-10 w-2 h-2 rounded-full ${ts.border}`} />
      <div className={`absolute bottom-1/3 left-14 w-3 h-3 rounded-full ${ts.border}`} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement type="fade-up" className="w-full">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Company Info */}
            <motion.div className="mb-8 md:mb-0" variants={itemVariants}>
              <div className="flex items-center mb-4">
                <img src="/LwaziNF.png" alt="Omeru Digital" className="w-10 h-10 mr-3" />
                <h2 className="text-3xl font-display font-bold">
                  <span className="gradient-text">omeru</span>.digital
                </h2>
              </div>
              <p className={`${ts.textSecondary} mb-6 leading-relaxed`}>
                Unlocking human potential with generative AI solutions for creative and industrial applications.
              </p>
              <div className="flex space-x-5">
                <motion.a 
                  href="#" 
                  aria-label="Facebook" 
                  className={`${ts.iconColor} transition-colors`}
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="Twitter" 
                  className={`${ts.iconColor} transition-colors`}
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="Instagram" 
                  className={`${ts.iconColor} transition-colors`}
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="LinkedIn" 
                  className={`${ts.iconColor} transition-colors`}
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="TikTok" 
                  className={`${ts.iconColor} transition-colors`}
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <FontAwesomeIcon icon={faTiktok} size="lg" />
                </motion.a>
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className={`text-xl font-bold mb-6 ${ts.text}`}>Quick Links</h3>
              <ul className="space-y-3">
                {['Models', 'Applications', 'Documentation', 'Pricing', 'Contact'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                    <Link href="#" className={`${ts.textSecondary} ${ts.linkHover} transition-colors flex items-center`}>
                      <span className={`${theme === 'dark' ? 'text-blue-400/60' : 'text-[#00452E]/60'} mr-2`}>›</span> {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Resources */}
            <motion.div variants={itemVariants}>
              <h3 className={`text-xl font-bold mb-6 ${ts.text}`}>Resources</h3>
              <ul className="space-y-3">
                {['Blog', 'Tutorials', 'Case Studies', 'API Reference', 'Community'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                    <Link href="#" className={`${ts.textSecondary} ${ts.linkHover} transition-colors flex items-center`}>
                      <span className={`${theme === 'dark' ? 'text-blue-400/60' : 'text-[#00452E]/60'} mr-2`}>›</span> {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Legal */}
            <motion.div variants={itemVariants}>
              <h3 className={`text-xl font-bold mb-6 ${ts.text}`}>Legal</h3>
              <ul className="space-y-3">
                {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Responsible AI', 'Security'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                    <Link href="#" className={`${ts.textSecondary} ${ts.linkHover} transition-colors flex items-center`}>
                      <span className={`${theme === 'dark' ? 'text-blue-400/60' : 'text-[#00452E]/60'} mr-2`}>›</span> {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className={`border-t ${ts.border} mt-16 pt-8 text-center ${ts.textSecondary}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p>&copy; {currentYear} Omeru Digital. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Crafted with <span className="text-red-400">♥</span> for the future of AI
            </p>
          </motion.div>
        </AnimatedElement>
      </div>
    </footer>
  );
};

export default Footer; 