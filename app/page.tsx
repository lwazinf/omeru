import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import FeaturedModel from './components/sections/FeaturedModel';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Header from './components/Header';

// AI UI decorative component
const AiDecorative = () => (
  <>
    {/* Data flow lines */}
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="data-flow" 
          style={{ 
            top: `${20 + i * 15}%`, 
            width: '200%',
            animationDelay: `${i * 2}s`,
            opacity: 0.05
          }}
        />
      ))}
    </div>
    
    {/* Corner connection nodes */}
    <div className="fixed top-4 left-4 w-20 h-20 pointer-events-none">
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00452E]/20"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00452E]/20"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00452E]/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00452E]/20"></div>
    </div>
    <div className="fixed bottom-4 right-4 w-20 h-20 pointer-events-none">
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00452E]/20"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00452E]/20"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00452E]/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00452E]/20"></div>
    </div>
    
    {/* System status indicator */}
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 font-mono text-[10px] text-[#00452E]/60 hidden md:block pointer-events-none">
      OMERU DIGITAL • MODULAR BUSINESS SOLUTIONS • VERSION 2.5.8
    </div>
  </>
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#111111]">
      <Header />
      
      {/* Content with padding for header */}
      <div className="mt-16">
        <Hero />
        <FeaturedModel />
        <Contact />
      </div>
      
      <Footer />
    </main>
  );
}
