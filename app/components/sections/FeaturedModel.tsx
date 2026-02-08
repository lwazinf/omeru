'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FeaturedModel = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: "End-to-end Automation",
      description: "Seamlessly connect business processes across departments, eliminating manual handoffs and reducing errors.",
      icon: "🔄"
    },
    {
      title: "Integration Framework",
      description: "Connect with existing systems through our flexible API layer, preserving your technology investments.",
      icon: "🔌"
    },
    {
      title: "Real-time Analytics",
      description: "Make data-driven decisions with customizable dashboards showing business performance metrics.",
      icon: "📊"
    },
    {
      title: "Mobile Experience",
      description: "Access your business ecosystem from anywhere with native mobile applications for iOS and Android.",
      icon: "📱"
    }
  ];
  
  return (
    <section id="featured-model" className="w-full py-24 md:py-32 px-6 md:px-12 relative bg-[#111111]">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16 md:mb-20">
          <div className="flex items-center justify-center md:justify-start">
            <div className="h-px w-12 bg-white/20 mr-4"></div>
            <span className="text-white/60 text-sm uppercase tracking-wider">Featured Solution</span>
          </div>
          <div className="flex space-x-1 justify-center md:justify-end">
            {[0, 1, 2].map((dot) => (
              <div 
                key={dot} 
                className={`w-1.5 h-1.5 rounded-full ${
                  dot === 0 ? 'bg-blue-400' : 'bg-white/20'
                }`}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left side - Solution description */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
            >
              Business Ecosystem Integration
            </motion.h2>
            
            <div className="flex items-center mb-8">
              <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <span className="text-xs text-white/80">MODULAR ARCHITECTURE</span>
              </div>
              <div className="h-px w-12 bg-white/10 ml-4"></div>
            </div>
            
            <p className="text-white/70 mb-10 text-lg">
              Our comprehensive ecosystem integration solution connects all your business systems into a unified, efficient platform. Eliminate silos, automate workflows, and gain real-time insights across your entire organization.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#contact"
                className="px-5 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-white text-sm font-medium flex items-center transition-all"
              >
                Schedule Demo
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </a>
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-md text-white/80 text-sm font-medium border border-white/10 transition-all"
              >
                {showInfo ? 'Hide Details' : 'View Details'}
              </button>
            </div>
            
            {/* Feature tabs */}
            <div>
              <div className="flex space-x-2 mb-6">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`p-2 rounded-md transition-all ${
                      activeFeature === index
                        ? 'bg-white/10 text-white'
                        : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    <span className="text-lg">{feature.icon}</span>
                  </button>
                ))}
              </div>
              
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-lg p-5"
              >
                <h3 className="text-white font-medium mb-2">
                  {features[activeFeature].title}
                </h3>
                <p className="text-white/70 text-sm">
                  {features[activeFeature].description}
                </p>
              </motion.div>
            </div>
            
            {/* Toggleable details */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: showInfo ? 'auto' : 0,
                opacity: showInfo ? 1 : 0
              }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-8"
            >
              <div className="p-5 bg-white/5 border border-white/10 rounded-lg">
                <h3 className="text-white font-medium mb-4">Key Features</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start text-white/70">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-400 text-xs">01</span>
                    </div>
                    <span>End-to-end business process automation</span>
                  </li>
                  <li className="flex items-start text-white/70">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-400 text-xs">02</span>
                    </div>
                    <span>Seamless integration with existing systems</span>
                  </li>
                  <li className="flex items-start text-white/70">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-400 text-xs">03</span>
                    </div>
                    <span>Real-time data synchronization across platforms</span>
                  </li>
                  <li className="flex items-start text-white/70">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-400 text-xs">04</span>
                    </div>
                    <span>Custom mobile and web applications</span>
                  </li>
                  <li className="flex items-start text-white/70">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-400 text-xs">05</span>
                    </div>
                    <span>Comprehensive analytics and reporting dashboards</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
          
          {/* Right side - Visualization */}
          <div className="grid grid-cols-2 gap-6 lg:h-[500px]">
            <div className="space-y-6">
              <motion.div 
                className="aspect-video bg-[#1A1A1A] rounded-xl overflow-hidden relative cursor-pointer border border-white/5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-8 h-8 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-2">
                      <span className="text-blue-400">📱</span>
                    </div>
                    <p className="text-white font-medium text-sm">Mobile App Interface</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
              </motion.div>
              <motion.div 
                className="aspect-square bg-[#1A1A1A] rounded-xl overflow-hidden relative cursor-pointer border border-white/5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-8 h-8 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-2">
                      <span className="text-blue-400">🔌</span>
                    </div>
                    <p className="text-white font-medium text-sm">System Architecture</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                className="aspect-[9/16] bg-[#1A1A1A] rounded-xl overflow-hidden relative cursor-pointer border border-white/5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-8 h-8 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-2">
                      <span className="text-blue-400">🔄</span>
                    </div>
                    <p className="text-white font-medium text-sm">Data Flow Visualization</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
              </motion.div>
              <motion.div 
                className="aspect-video bg-[#1A1A1A] rounded-xl overflow-hidden relative cursor-pointer border border-white/5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-8 h-8 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-2">
                      <span className="text-blue-400">📊</span>
                    </div>
                    <p className="text-white font-medium text-sm">Analytics Dashboard</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Minimal code example */}
        <div className="mt-16 mx-auto max-w-4xl">
          <div className="bg-[#1A1A1A] rounded-lg border border-white/5 p-5 font-mono text-xs">
            <div className="flex items-center mb-4">
              <div className="flex items-center space-x-1.5 mr-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-white/40">integration.js</span>
            </div>
            <div className="text-white/70">const <span className="text-blue-400">OmeruDigital</span> = {'{'}</div>
            <div className="text-white/70 ml-4">connectSystems: <span className="text-blue-400">async</span> (businessModules) {'=>'} {'{'}</div>
            <div className="text-white/70 ml-8">const ecosystem = <span className="text-blue-400">await</span> ModularArchitecture.create();</div>
            <div className="text-white/70 ml-8"><span className="text-blue-400">return</span> ecosystem.integrate(businessModules);</div>
            <div className="text-white/70 ml-4">{'}'}{','}</div>
            <div className="text-white/70">{'}'}{';'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModel; 
