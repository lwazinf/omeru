import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import FeaturedModel from './components/sections/FeaturedModel';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedModel />
      <Contact />
      <Footer />
    </main>
  );
}
