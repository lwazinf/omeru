'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-[#111111]/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center mr-2 overflow-hidden">
            <img src="/LwaziNF.png" alt="Omeru Digital" className="w-5 h-5" />
          </div>
          <span className="text-white text-sm">omeru digital</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/#services">Services</NavLink>
          <NavLink href="/work">Work</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
        </nav>
        
        <div className="md:hidden">
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

// Navigation link component
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href}>
      <motion.span 
        className="text-white/60 text-sm hover:text-white transition-colors cursor-pointer"
        whileHover={{ y: -1 }}
      >
        {children}
      </motion.span>
    </Link>
  );
};

export default Header; 