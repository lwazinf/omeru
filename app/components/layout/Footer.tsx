'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import AnimatedElement from '../ui/AnimatedElement';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
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
  
  return (
    <footer className="bg-[#F2E8DD] text-[#00452E] py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#00452E]/5 blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#E4CBA5]/10 blur-3xl -z-0" />
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5 pattern-overlay"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 h-px w-20 bg-[#00452E]/20" />
      <div className="absolute bottom-32 right-20 h-px w-40 bg-[#00452E]/10" />
      <div className="absolute top-1/3 right-10 w-2 h-2 rounded-full bg-[#00452E]/20" />
      <div className="absolute bottom-1/3 left-14 w-3 h-3 rounded-full bg-[#00452E]/10" />
      
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
              <h2 className="text-3xl font-display font-bold mb-4">
                <span className="gradient-text">omeru</span>.digital
              </h2>
              <p className="text-[#666] mb-6 leading-relaxed">
                Unlocking human potential with generative AI solutions for creative and industrial applications.
              </p>
              <div className="flex space-x-5">
                <motion.a 
                  href="#" 
                  aria-label="Facebook" 
                  className="text-[#00452E]/70 hover:text-[#00452E] transition-colors"
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="Twitter" 
                  className="text-[#00452E]/70 hover:text-[#00452E] transition-colors"
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="Instagram" 
                  className="text-[#00452E]/70 hover:text-[#00452E] transition-colors"
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="LinkedIn" 
                  className="text-[#00452E]/70 hover:text-[#00452E] transition-colors"
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="TikTok" 
                  className="text-[#00452E]/70 hover:text-[#00452E] transition-colors"
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <FontAwesomeIcon icon={faTiktok} size="lg" />
                </motion.a>
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-[#00452E]">Quick Links</h3>
              <ul className="space-y-3">
                {['Models', 'Applications', 'Documentation', 'Pricing', 'Contact'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                    <Link href="#" className="text-[#666] hover:text-[#00452E] transition-colors flex items-center">
                      <span className="text-[#00452E]/60 mr-2">›</span> {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Resources */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-[#00452E]">Resources</h3>
              <ul className="space-y-3">
                {['Blog', 'Tutorials', 'Case Studies', 'API Reference', 'Community'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                    <Link href="#" className="text-[#666] hover:text-[#00452E] transition-colors flex items-center">
                      <span className="text-[#00452E]/60 mr-2">›</span> {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Legal */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-[#00452E]">Legal</h3>
              <ul className="space-y-3">
                {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Responsible AI', 'Security'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                    <Link href="#" className="text-[#666] hover:text-[#00452E] transition-colors flex items-center">
                      <span className="text-[#00452E]/60 mr-2">›</span> {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="border-t border-[#00452E]/10 mt-16 pt-8 text-center text-[#666]"
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