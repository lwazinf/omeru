'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-display font-bold">
          omeru.digital
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <div className="relative group">
          <button className="py-2 hover:text-green-700 font-medium flex items-center">
            Models <span className="ml-1">▼</span>
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left">
            <div className="py-2">
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Text Models</Link>
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Image Models</Link>
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Video Models</Link>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <button className="py-2 hover:text-green-700 font-medium flex items-center">
            Applications <span className="ml-1">▼</span>
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left">
            <div className="py-2">
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Content Creation</Link>
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Image Generation</Link>
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Video Editing</Link>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <button className="py-2 hover:text-green-700 font-medium flex items-center">
            Deployment <span className="ml-1">▼</span>
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left">
            <div className="py-2">
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Cloud Solutions</Link>
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">API Access</Link>
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Enterprise</Link>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <button className="py-2 hover:text-green-700 font-medium flex items-center">
            Company <span className="ml-1">▼</span>
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left">
            <div className="py-2">
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">About Us</Link>
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Team</Link>
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Careers</Link>
            </div>
          </div>
        </div>
        
        <Link href="#" className="py-2 hover:text-green-700 font-medium">
          Docs
        </Link>
        
        <button aria-label="Search" className="py-2 hover:text-green-700">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      
      <div className="hidden md:block">
        <Link 
          href="#contact" 
          className="bg-[#00452E] text-white py-2 px-6 rounded-md font-medium hover:bg-opacity-90 transition-all"
        >
          Contact Us
        </Link>
      </div>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden text-2xl" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
      </button>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 pt-20 px-6">
          <div className="flex flex-col space-y-6">
            <div className="border-b pb-4">
              <button className="w-full text-left py-2 font-medium">Models</button>
              <div className="pl-4 mt-2 flex flex-col space-y-2">
                <Link href="#" className="py-1">Text Models</Link>
                <Link href="#" className="py-1">Image Models</Link>
                <Link href="#" className="py-1">Video Models</Link>
              </div>
            </div>
            
            <div className="border-b pb-4">
              <button className="w-full text-left py-2 font-medium">Applications</button>
              <div className="pl-4 mt-2 flex flex-col space-y-2">
                <Link href="#" className="py-1">Content Creation</Link>
                <Link href="#" className="py-1">Image Generation</Link>
                <Link href="#" className="py-1">Video Editing</Link>
              </div>
            </div>
            
            <div className="border-b pb-4">
              <button className="w-full text-left py-2 font-medium">Deployment</button>
              <div className="pl-4 mt-2 flex flex-col space-y-2">
                <Link href="#" className="py-1">Cloud Solutions</Link>
                <Link href="#" className="py-1">API Access</Link>
                <Link href="#" className="py-1">Enterprise</Link>
              </div>
            </div>
            
            <div className="border-b pb-4">
              <button className="w-full text-left py-2 font-medium">Company</button>
              <div className="pl-4 mt-2 flex flex-col space-y-2">
                <Link href="#" className="py-1">About Us</Link>
                <Link href="#" className="py-1">Team</Link>
                <Link href="#" className="py-1">Careers</Link>
              </div>
            </div>
            
            <Link href="#" className="py-2 font-medium">Docs</Link>
            
            <div className="pt-4">
              <Link 
                href="#contact" 
                className="block w-full bg-[#00452E] text-white py-3 px-6 rounded-md font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          <button 
            className="absolute top-6 right-6 text-2xl" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 