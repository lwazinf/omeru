'use client';

import React from 'react';

const Hero = () => {
  return (
    <section className="w-full py-16 md:py-28 px-6 md:px-12 text-center">
      <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight max-w-4xl mx-auto">
        Unlocking Human Potential
        <br />
        With Generative AI.
      </h1>
      
      <p className="mt-8 text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
        Developing and providing open-source AI models
        <br />
        for creative problem-solving and industrial use.
      </p>
      
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {/* Model Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 w-full max-w-2xl mx-auto">
          <button
            className="px-6 py-2 border-2 border-gray-300 rounded-full bg-white hover:bg-gray-50 font-medium text-sm md:text-base transition-all"
          >
            Image
          </button>
          <button
            className="px-6 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-50 font-medium text-sm md:text-base transition-all"
          >
            Video
          </button>
          <button
            className="px-6 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-50 font-medium text-sm md:text-base transition-all"
          >
            Audio
          </button>
          <button
            className="px-6 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-50 font-medium text-sm md:text-base transition-all"
          >
            Language Models
          </button>
          <button
            className="px-6 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-50 font-medium text-sm md:text-base transition-all relative"
          >
            3D Objects
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-1 rounded">NEW</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 