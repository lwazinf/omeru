'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faMobile, 
  faPaintBrush, 
  faRobot, 
  faBullhorn, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import styles from './services.module.css';

// Service data
const services = [
  {
    id: 'web_development',
    name: 'Web Development',
    icon: faCode,
    description: 'Custom websites and web applications built with modern technologies and best practices.',
    features: [
      'E-commerce Platforms',
      'Business Websites',
      'Web Applications',
      'Custom Portals'
    ],
    color: 'blue'
  },
  {
    id: 'mobile_development',
    name: 'Mobile Development',
    icon: faMobile,
    description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
    features: [
      'iOS Apps',
      'Android Apps',
      'Cross-platform Solutions',
      'Progressive Web Apps'
    ],
    color: 'green'
  },
  {
    id: 'graphic_design',
    name: 'Graphic Design',
    icon: faPaintBrush,
    description: 'Visual branding and digital asset creation to establish a strong and consistent brand presence.',
    features: [
      'Brand Identity',
      'Marketing Materials',
      'UI/UX Design',
      'Social Media Assets'
    ],
    color: 'purple'
  },
  {
    id: 'business_automation',
    name: 'Business Automation',
    icon: faRobot,
    description: 'Streamline processes and reduce manual tasks with custom automation workflows and integrations.',
    features: [
      'Workflow Automation',
      'Data Processing',
      'CRM Integration',
      'Custom Solutions'
    ],
    color: 'amber'
  },
  {
    id: 'digital_marketing',
    name: 'Digital Marketing',
    icon: faBullhorn,
    description: 'Strategic marketing solutions to increase visibility, engagement, and conversion for your business.',
    features: [
      'SEO Strategy',
      'Content Marketing',
      'Social Media',
      'Email Campaigns'
    ],
    color: 'red'
  }
];

const Services = () => {
  // Add theme state that syncs with the app's theme
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  // Active service for mobile view
  const [activeService, setActiveService] = useState<string>(services[0].id);
  // State for viewport width
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
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
  
  // Detect if on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Theme-based style variables
  const themeStyles = {
    dark: {
      bg: 'bg-[#111111]',
      cardBg: 'bg-[#1A1A1A]',
      cardBgHover: 'hover:bg-[#222]',
      sectionBg: 'bg-gradient-to-b from-[#0f0f0f] to-[#161616]',
      text: 'text-white',
      textSecondary: 'text-white/70',
      textTertiary: 'text-white/50',
      border: 'border-white/10',
      divider: 'bg-white/10',
      iconBg: 'bg-white/5',
      badgeBg: 'bg-white/10',
      featureIcon: 'text-blue-400',
      tagText: 'text-blue-300',
      shadow: 'shadow-black/30',
    },
    light: {
      bg: 'bg-[#f5f7fa]',
      cardBg: 'bg-white',
      cardBgHover: 'hover:bg-gray-50',
      sectionBg: 'bg-gradient-to-b from-[#f0f4f8] to-[#e6eef5]',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      textTertiary: 'text-gray-500',
      border: 'border-gray-200',
      divider: 'bg-gray-200',
      iconBg: 'bg-gray-100',
      badgeBg: 'bg-blue-50',
      featureIcon: 'text-blue-500',
      tagText: 'text-blue-600',
      shadow: 'shadow-gray-200/60',
    }
  };

  // Color styles for services
  const colorStyles = {
    blue: {
      dark: {
        iconBg: 'bg-blue-900/20',
        iconColor: 'text-blue-400',
        gradientFrom: 'from-blue-600',
        gradientTo: 'to-blue-500',
      },
      light: {
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        gradientFrom: 'from-blue-500',
        gradientTo: 'to-blue-400',
      }
    },
    green: {
      dark: {
        iconBg: 'bg-green-900/20',
        iconColor: 'text-green-400',
        gradientFrom: 'from-green-600',
        gradientTo: 'to-green-500',
      },
      light: {
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-green-400',
      }
    },
    purple: {
      dark: {
        iconBg: 'bg-purple-900/20',
        iconColor: 'text-purple-400',
        gradientFrom: 'from-purple-600',
        gradientTo: 'to-purple-500',
      },
      light: {
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-purple-400',
      }
    },
    amber: {
      dark: {
        iconBg: 'bg-amber-900/20',
        iconColor: 'text-amber-400',
        gradientFrom: 'from-amber-600',
        gradientTo: 'to-amber-500',
      },
      light: {
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        gradientFrom: 'from-amber-500',
        gradientTo: 'to-amber-400',
      }
    },
    red: {
      dark: {
        iconBg: 'bg-red-900/20',
        iconColor: 'text-red-400',
        gradientFrom: 'from-red-600',
        gradientTo: 'to-red-500',
      },
      light: {
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        gradientFrom: 'from-red-500',
        gradientTo: 'to-red-400',
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  // Current theme styling
  const ts = themeStyles[theme];

  return (
    <section id="services" className={`w-full py-24 ${ts.sectionBg} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-500/5 blur-[100px] z-0"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] z-0"></div>
      
      {/* Logo decorative element */}
      <div className="absolute top-10 right-5 md:right-10 opacity-5 z-0">
        <img src="/LwaziNF.png" alt="Omeru Digital" className="w-32 md:w-40" />
      </div>
      <div className="absolute bottom-10 left-5 md:left-10 opacity-5 z-0 transform rotate-180">
        <img src="/LwaziNF.png" alt="Omeru Digital" className="w-32 md:w-40" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header with logo */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <img src="/LwaziNF.png" alt="Omeru Digital" className="w-16 h-16 mb-4" />
          </div>
          <div className="inline-flex items-center mb-4">
            <div className="h-px w-6 bg-blue-400/40 mr-3"></div>
            <span className={`text-sm uppercase tracking-wider ${ts.tagText}`}>Our Expertise</span>
            <div className="h-px w-6 bg-blue-400/40 ml-3"></div>
          </div>
          <h2 className={`text-4xl md:text-5xl font-display font-bold ${ts.text} mb-6`}>
            Services
          </h2>
          <p className={`${ts.textSecondary} max-w-2xl mx-auto text-lg`}>
            Comprehensive digital solutions to transform your business and accelerate growth through custom development, design, and strategic implementation.
          </p>
        </div>
        
        {/* Desktop service cards grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 hidden md:grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => {
            const cs = colorStyles[service.color as keyof typeof colorStyles][theme];
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`${ts.cardBg} ${ts.cardBgHover} border ${ts.border} rounded-xl p-6 flex flex-col h-full transition-all duration-300 group cursor-pointer shadow-md ${ts.shadow} ${styles.serviceCard} ${styles.cardBorderGradient}`}
              >
                <div className={`w-12 h-12 ${cs.iconBg} rounded-lg flex items-center justify-center mb-6 ${styles.iconPulse}`}>
                  <FontAwesomeIcon icon={service.icon} className={`${cs.iconColor} text-lg`} />
                </div>
                
                <h3 className={`text-xl font-bold ${ts.text} mb-3`}>{service.name}</h3>
                <p className={`${ts.textSecondary} mb-6 text-sm flex-grow`}>{service.description}</p>
                
                <div className="mt-auto">
                  <div className={`h-px w-full ${ts.divider} mb-6`}></div>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className={`flex items-center ${styles.featureItem}`}>
                        <div className={`w-4 h-4 rounded-full ${cs.iconBg} flex items-center justify-center mr-3`}>
                          <div className={`w-1.5 h-1.5 ${cs.iconColor} rounded-full`}></div>
                        </div>
                        <span className={`text-sm ${ts.textSecondary}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div className={`px-3 py-1 ${ts.badgeBg} rounded-full ${styles.animatedBadge}`}>
                      <span className={`text-xs ${ts.tagText}`}>Learn More</span>
                    </div>
                    <FontAwesomeIcon 
                      icon={faArrowRight} 
                      className={`${cs.iconColor} opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300`} 
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Mobile service display */}
        <div className="md:hidden">
          {/* Service tabs */}
          <div className={`flex overflow-x-auto pb-4 mb-6 ${styles.hideScrollbar}`}>
            <div className="flex space-x-2">
              {services.map((service) => {
                const cs = colorStyles[service.color as keyof typeof colorStyles][theme];
                const isActive = activeService === service.id;
                
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      isActive 
                        ? `bg-gradient-to-r ${cs.gradientFrom} ${cs.gradientTo} text-white`
                        : `${ts.cardBg} ${ts.border} border ${ts.textSecondary}`
                    }`}
                  >
                    <FontAwesomeIcon icon={service.icon} className={isActive ? 'text-white mr-2' : `${cs.iconColor} mr-2`} />
                    <span className="text-sm font-medium">{service.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Active service content */}
          {services.map((service) => {
            if (service.id !== activeService) return null;
            
            const cs = colorStyles[service.color as keyof typeof colorStyles][theme];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`${ts.cardBg} border ${ts.border} rounded-xl p-6 shadow-md ${ts.shadow} ${styles.serviceCard} ${styles.cardBorderGradient}`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 ${cs.iconBg} rounded-lg flex items-center justify-center mr-4 ${styles.iconPulse}`}>
                    <FontAwesomeIcon icon={service.icon} className={`${cs.iconColor}`} />
                  </div>
                  <h3 className={`text-xl font-bold ${ts.text}`}>{service.name}</h3>
                </div>
                
                <p className={`${ts.textSecondary} mb-6`}>{service.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className={`flex items-center ${styles.featureItem}`}>
                      <div className={`w-4 h-4 rounded-full ${cs.iconBg} flex items-center justify-center mr-2`}>
                        <div className={`w-1.5 h-1.5 ${cs.iconColor} rounded-full`}></div>
                      </div>
                      <span className={`text-sm ${ts.textSecondary}`}>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${cs.gradientFrom} ${cs.gradientTo} text-white flex items-center justify-center ${styles.learnMoreBtn}`}>
                  <span className="mr-2">Learn More</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </motion.div>
            );
          })}
        </div>
        
        {/* CTA section */}
        <div className={`mt-16 text-center ${ts.cardBg} border ${ts.border} rounded-xl p-8 shadow-lg ${ts.shadow} ${styles.cardBorderGradient} relative overflow-hidden`}>
          {/* Small logo in corner */}
          <div className="absolute top-4 right-4 opacity-10">
            <img src="/LwaziNF.png" alt="Omeru Digital" className={`w-16 h-16 ${isMobile ? 'hidden' : 'block'}`} />
          </div>
          
          <h3 className={`text-2xl font-bold ${ts.text} mb-4`}>Ready to transform your digital presence?</h3>
          <p className={`${ts.textSecondary} mb-8 max-w-2xl mx-auto`}>
            Our team of experts is ready to help you implement the perfect solution for your business needs.
          </p>
          
          <div className="flex items-center justify-center">
            <button className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md shadow-blue-900/20 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 ${styles.learnMoreBtn} flex items-center`}>
              <span className="mr-2">Schedule a Consultation</span>
              <span className="flex items-center justify-center w-6 h-6">
                <img src="/LwaziNF.png" alt="" className="w-full h-full" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 