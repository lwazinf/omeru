'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="w-full py-12 md:py-16 px-6 md:px-12 bg-[#111111] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center mr-2">
                <span className="text-white text-xs font-medium">O</span>
              </div>
              <span className="text-white text-sm">omeru digital</span>
            </div>
            <p className="text-white/60 text-sm mb-6">
              Modern digital solutions for forward-thinking businesses.
            </p>
            <div className="flex space-x-3">
              <SocialLink href="#" icon={<FontAwesomeIcon icon={faTwitter} />} />
              <SocialLink href="#" icon={
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              } />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-medium text-sm mb-4">Services</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Web Development</FooterLink>
              <FooterLink href="#">Mobile Development</FooterLink>
              <FooterLink href="#">Business Automation</FooterLink>
              <FooterLink href="#">System Integration</FooterLink>
            </ul>
          </div>
          
          {/* Company */}
          <div className="md:col-span-1">
            <h3 className="text-white font-medium text-sm mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Our Work</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="text-white font-medium text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Cookie Policy</FooterLink>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} Omeru Digital. All rights reserved.
          </p>
          <div className="text-white/40 text-xs">
            Built with precision for exceptional performance
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social link component
const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
    >
      {icon}
    </a>
  );
};

// Footer link component
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link href={href} className="text-white/60 text-sm hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
};

export default Footer; 