import React from 'react';
import Header from './components/Header';
import Hero from './components/sections/Hero';
import FeaturedModel from './components/sections/FeaturedModel';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import StructuredData from './components/StructuredData';

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
      
      {/* Structured Data for SEO */}
      <StructuredData 
        type="Organization"
        sameAs={[
          'https://twitter.com/omerudigital',
          'https://facebook.com/omerudigital',
          'https://linkedin.com/company/omerudigital',
          'https://instagram.com/omerudigital'
        ]}
      />
      
      <StructuredData 
        type="WebSite"
        name="Omeru Digital - Modern Business Solutions"
        description="Custom digital solutions for modern businesses through app development, design, and strategic integrations."
      />
    </main>
  );
}
