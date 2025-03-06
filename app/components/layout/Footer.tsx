'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#00452E] text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-display font-bold mb-4">omeru.digital</h2>
            <p className="text-gray-300 mb-4">
              Unlocking human potential with generative AI solutions.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="hover:text-[#E4CBA5] transition-colors">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-[#E4CBA5] transition-colors">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-[#E4CBA5] transition-colors">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-[#E4CBA5] transition-colors">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </Link>
              <Link href="#" aria-label="TikTok" className="hover:text-[#E4CBA5] transition-colors">
                <FontAwesomeIcon icon={faTiktok} size="lg" />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Models</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Applications</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Tutorials</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Responsible AI</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Omeru Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 