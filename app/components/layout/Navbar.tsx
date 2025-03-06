'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faSearch, 
  faTimes, 
  faCode, 
  faServer,
  faRocket,
  faCubes,
  faLaptopCode,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Handle scroll event to change navbar style when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Update the current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };
  
  // Use safe versions of FontAwesome icons
  const iconSet = {
    code: faCode,
    server: faServer,
    rocket: faRocket,
    cubes: faCubes,
    laptop: faLaptopCode,
    database: faDatabase
  };
  
  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 w-full py-3 px-6 md:px-12 flex items-center justify-between z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[rgba(250,246,241,0.85)] backdrop-blur-md border-b border-[#E4CBA5]/20' 
          : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      {/* AI decorative line element */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00452E]/20 to-transparent"></div>
      
      {/* Nav connection points - decorative */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-12 opacity-40 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            className="w-px h-1 bg-[#00452E]"
            animate={{ 
              height: [1, 3, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      
      <motion.div className="flex items-center" variants={itemVariants}>
        <Link href="/" className="text-xl font-display font-bold gradient-text flex items-center">
          <div className="relative mr-2 w-6 h-6">
            <motion.div 
              className="absolute inset-0 rounded-full bg-[#00452E]"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.div 
              className="absolute inset-1 rounded-full bg-[#E4CBA5]"
              animate={{
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
          <span className="relative">
            omeru.digital
            <motion.span 
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#00452E] to-[#E4CBA5]"
              animate={{ width: ['0%', '100%', '0%'] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </span>
        </Link>
        
        {/* System status indicator */}
        <div className="ml-4 hidden md:flex items-center text-xs font-mono">
          <motion.span 
            className="inline-block w-2 h-2 rounded-full bg-[#00452E]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="ml-1 text-[#666]">
            DEV STUDIO | {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>
      </motion.div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {[
          { name: 'Services', icon: iconSet.code, items: ['App Development', 'Automation', 'Integrations', 'Consulting'] },
          { name: 'Solutions', icon: iconSet.server, items: ['Business Process', 'Customer Experience', 'Enterprise Systems', 'Data Intelligence'] },
          { name: 'About', icon: null, items: ['Our Approach', 'Team', 'Process', 'Case Studies'] },
          { name: 'Resources', icon: null, items: ['Blog', 'Documentation', 'Guides', 'Tools'] }
        ].map((item) => (
          <motion.div key={item.name} className="relative group" variants={itemVariants}>
            <button className="py-2 px-2 text-[#666] hover:text-[#00452E] font-mono text-sm border border-transparent hover:border-[#E4CBA5]/30 rounded flex items-center">
              {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-2 text-[#00452E]/70" size="xs" />}
              {item.name.toUpperCase()} 
              <span className="ml-1 text-[10px] opacity-50">▼</span>
            </button>
            <motion.div 
              className="absolute left-0 mt-1 w-56 bg-white/95 backdrop-blur-md shadow-lg rounded-md overflow-hidden z-10 origin-top-left border border-[#E4CBA5]/20"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              whileHover={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ display: 'none' }} // Hide initially
              onHoverStart={(e) => {
                if (e.currentTarget) {
                  (e.currentTarget as HTMLElement).style.display = 'block';
                }
              }}
              onHoverEnd={(e) => {
                if (e.currentTarget) {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }
              }}
            >
              <div className="py-1">
                {/* Terminal-style header */}
                <div className="px-3 py-1 bg-[#00452E]/10 border-b border-[#E4CBA5]/20">
                  <span className="text-[10px] font-mono text-[#00452E]/70">
                    {'// '}{item.name.toLowerCase()}.module.ts
                  </span>
                </div>
                
                {item.items.map((subItem, idx) => (
                  <Link 
                    href="#" 
                    key={idx}
                    className="block px-4 py-2 text-xs text-[#666] hover:bg-[#00452E]/5 hover:text-[#00452E] transition-colors font-mono"
                  >
                    <span className="text-[#00452E] mr-2">&gt;</span> 
                    {subItem.toUpperCase().replace(/ /g, '_')}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
        
        <motion.div variants={itemVariants}>
          <Link href="#" className="py-2 text-[#666] hover:text-[#00452E] font-mono text-sm flex items-center">
            <FontAwesomeIcon icon={iconSet.rocket} className="mr-2 text-[#00452E]/70" size="xs" />
            PORTFOLIO
          </Link>
        </motion.div>
        
        <motion.button 
          aria-label="Search" 
          className="p-2 text-[#666] hover:text-[#00452E] border border-transparent hover:border-[#E4CBA5]/30 rounded"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faSearch} size="sm" />
        </motion.button>
      </div>
      
      <motion.div className="hidden md:block" variants={itemVariants}>
        <Button 
          href="#contact" 
          variant="primary"
          className="font-mono text-sm"
        >
          <span className="mr-1">&gt;</span> BOOK CONSULTATION
        </Button>
      </motion.div>
      
      {/* Mobile menu button */}
      <motion.button 
        className="md:hidden p-2 text-[#00452E] border border-transparent hover:border-[#E4CBA5]/30 rounded" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
      </motion.button>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-lg z-50 pt-20 px-6"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Mobile AI system decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00452E]/50 to-[#E4CBA5]/50"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E4CBA5]/50 to-[#00452E]/50"></div>
            
            {/* Terminal-style header for mobile menu */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 font-mono text-xs text-[#00452E] bg-[#00452E]/5 px-4 py-1 rounded border border-[#E4CBA5]/20">
              <span className="text-[#E4CBA5]">$</span> omeru_digital<span className="text-[#E4CBA5]">::</span>navigation
            </div>
            
            <div className="flex flex-col space-y-6">
              <div className="border-b border-[#E4CBA5]/20 pb-4">
                <button className="w-full text-left py-2 font-mono text-sm text-[#00452E] flex items-center">
                  <FontAwesomeIcon icon={iconSet.code} className="mr-2" size="sm" />
                  SERVICES
                </button>
                <div className="pl-8 mt-2 flex flex-col space-y-2">
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> APP_DEVELOPMENT
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> AUTOMATION
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> INTEGRATIONS
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> CONSULTING
                  </Link>
                </div>
              </div>
              
              <div className="border-b border-[#E4CBA5]/20 pb-4">
                <button className="w-full text-left py-2 font-mono text-sm text-[#00452E] flex items-center">
                  <FontAwesomeIcon icon={iconSet.server} className="mr-2" size="sm" />
                  SOLUTIONS
                </button>
                <div className="pl-8 mt-2 flex flex-col space-y-2">
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> BUSINESS_PROCESS
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> CUSTOMER_EXPERIENCE
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> ENTERPRISE_SYSTEMS
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> DATA_INTELLIGENCE
                  </Link>
                </div>
              </div>
              
              <div className="border-b border-[#E4CBA5]/20 pb-4">
                <button className="w-full text-left py-2 font-mono text-sm text-[#00452E]">
                  ABOUT
                </button>
                <div className="pl-8 mt-2 flex flex-col space-y-2">
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> OUR_APPROACH
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> TEAM
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> PROCESS
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> CASE_STUDIES
                  </Link>
                </div>
              </div>
              
              <div className="border-b border-[#E4CBA5]/20 pb-4">
                <button className="w-full text-left py-2 font-mono text-sm text-[#00452E]">
                  RESOURCES
                </button>
                <div className="pl-8 mt-2 flex flex-col space-y-2">
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> BLOG
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> DOCUMENTATION
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> GUIDES
                  </Link>
                  <Link href="#" className="py-1 text-xs font-mono text-[#666] hover:text-[#00452E]">
                    <span className="text-[#00452E] mr-2">&gt;</span> TOOLS
                  </Link>
                </div>
              </div>
              
              <Link href="#" className="py-2 font-mono text-sm text-[#666] hover:text-[#00452E] flex items-center">
                <FontAwesomeIcon icon={iconSet.rocket} className="mr-2" size="sm" />
                PORTFOLIO
              </Link>
              
              <div className="pt-4">
                <Button
                  href="#contact" 
                  variant="primary"
                  fullWidth
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-sm"
                >
                  <span className="mr-1">&gt;</span> BOOK CONSULTATION
                </Button>
              </div>
            </div>
            
            {/* System status indicator for mobile */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <div className="font-mono text-xs text-[#666] flex items-center">
                <motion.span 
                  className="inline-block w-2 h-2 rounded-full bg-[#00452E]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="ml-1">DEVELOPMENT STUDIO</span>
              </div>
            </div>
            
            <motion.button 
              className="absolute top-6 right-6 text-2xl text-[#00452E]" 
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 