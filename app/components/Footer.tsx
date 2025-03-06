'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
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
  
  // Theme-based style variables
  const themeStyles = {
    dark: {
      bg: 'bg-[#111111]',
      text: 'text-white',
      textSecondary: 'text-white/60',
      textTertiary: 'text-white/40',
      border: 'border-white/10',
      socialBg: 'bg-white/5',
      socialHover: 'hover:bg-white/10 hover:text-white',
      linkHover: 'hover:text-white',
    },
    light: {
      bg: 'bg-[#F2E8DD]',
      text: 'text-[#00452E]',
      textSecondary: 'text-[#666]',
      textTertiary: 'text-[#999]',
      border: 'border-[#00452E]/10',
      socialBg: 'bg-[#00452E]/5',
      socialHover: 'hover:bg-[#00452E]/10 hover:text-[#00452E]',
      linkHover: 'hover:text-[#00452E]',
    }
  };
  
  // Current theme styling
  const ts = themeStyles[theme];
  
  return (
    <footer className={`w-full py-12 md:py-16 px-6 md:px-12 ${ts.bg} border-t ${ts.border}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className={`w-8 h-8 rounded-sm ${theme === 'dark' ? 'bg-white/10' : 'bg-[#00452E]/10'} flex items-center justify-center mr-2 overflow-hidden`}>
                <img src="/LwaziNF.png" alt="" className="w-5 h-5" />
              </div>
              <span className={`${ts.text} text-sm`}>omeru digital</span>
            </div>
            <p className={`${ts.textSecondary} text-sm mb-6`}>
              Modern digital solutions for forward-thinking businesses.
            </p>
            <div className="flex space-x-3">
              <SocialLink href="#" icon={<FontAwesomeIcon icon={faTwitter} />} theme={theme} />
              <SocialLink href="#" icon={
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              } theme={theme} />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className={`${ts.text} font-medium text-sm mb-4`}>Services</h3>
            <ul className="space-y-2">
              <FooterLink href="#" theme={theme}>Web Development</FooterLink>
              <FooterLink href="#" theme={theme}>Mobile Development</FooterLink>
              <FooterLink href="#" theme={theme}>Business Automation</FooterLink>
              <FooterLink href="#" theme={theme}>System Integration</FooterLink>
            </ul>
          </div>
          
          {/* Company */}
          <div className="md:col-span-1">
            <h3 className={`${ts.text} font-medium text-sm mb-4`}>Company</h3>
            <ul className="space-y-2">
              <FooterLink href="#" theme={theme}>About Us</FooterLink>
              <FooterLink href="#" theme={theme}>Our Work</FooterLink>
              <FooterLink href="#" theme={theme}>Careers</FooterLink>
              <FooterLink href="#" theme={theme}>Contact</FooterLink>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className={`${ts.text} font-medium text-sm mb-4`}>Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="#" theme={theme}>Privacy Policy</FooterLink>
              <FooterLink href="#" theme={theme}>Terms of Service</FooterLink>
              <FooterLink href="#" theme={theme}>Cookie Policy</FooterLink>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className={`mt-16 pt-6 border-t ${ts.border} flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${ts.textTertiary} text-xs mb-4 md:mb-0`}>
            © {new Date().getFullYear()} Omeru Digital. All rights reserved.
          </p>
          <div className={`${ts.textTertiary} text-xs`}>
            Built with precision for exceptional performance
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social link component
const SocialLink = ({ href, icon, theme }: { href: string; icon: React.ReactNode; theme: 'dark' | 'light' }) => {
  const ts = {
    dark: {
      bg: 'bg-white/5',
      hoverBg: 'hover:bg-white/10',
      text: 'text-white/60',
      hoverText: 'hover:text-white',
    },
    light: {
      bg: 'bg-[#00452E]/5',
      hoverBg: 'hover:bg-[#00452E]/10',
      text: 'text-[#00452E]/60',
      hoverText: 'hover:text-[#00452E]',
    }
  };
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`w-8 h-8 rounded-full ${ts[theme].bg} flex items-center justify-center ${ts[theme].text} ${ts[theme].hoverBg} ${ts[theme].hoverText} transition-all`}
    >
      {icon}
    </a>
  );
};

// Footer link component
const FooterLink = ({ href, children, theme }: { href: string; children: React.ReactNode; theme: 'dark' | 'light' }) => {
  const linkStyle = theme === 'dark' 
    ? 'text-white/60 hover:text-white' 
    : 'text-[#00452E]/60 hover:text-[#00452E]';
  
  return (
    <li>
      <Link href={href} className={`${linkStyle} text-sm transition-colors`}>
        {children}
      </Link>
    </li>
  );
};

export default Footer; 