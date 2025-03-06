'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FeaturedModel = () => {
  return (
    <section className="w-full py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto bg-[#f8f8f8] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Model Description */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Stable Diffusion 3 Medium.
            </h2>
            <p className="text-gray-700 mb-6">
              Is our most advanced text-to-image AI model with two billion parameters, 
              excelling in photorealism, handling complex prompts, generating clear text, 
              and offering unparalleled creative possibilities.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#00452E] text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center">
                Get Started with API 
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
              <button className="border-2 border-gray-300 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-all">
                Show Info
              </button>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Image 1
                </div>
              </div>
              <div className="aspect-square bg-gray-300 rounded-lg overflow-hidden relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Image 2
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-[9/16] bg-gray-300 rounded-lg overflow-hidden relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Image 3
                </div>
              </div>
              <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Image 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModel; 