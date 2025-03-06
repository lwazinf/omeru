import React from 'react';
import Header from './components/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import FeaturedModel from './components/sections/FeaturedModel';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#111111]">
      <Header />
      
      {/* Content with padding for header */}
      <div className="mt-16">
        <Hero />
        <Services />
        <FeaturedModel />
        <Contact />
      </div>
      
      <Footer />
    </main>
  );
}
