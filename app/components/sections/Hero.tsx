'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedElement from '../ui/AnimatedElement';
import Button from '../ui/Button';

// Service categories with subcategories
const serviceCategories = {
  web_development: {
    label: "Web Development",
    options: [
      "E-commerce Platform",
      "Business Website",
      "Web Application",
      "Custom Portal"
    ]
  },
  mobile_development: {
    label: "Mobile Development",
    options: [
      "iOS App",
      "Android App",
      "Cross-platform App",
      "Progressive Web App"
    ]
  },
  graphic_design: {
    label: "Graphic Design",
    options: [
      "Brand Identity",
      "Marketing Materials",
      "UI/UX Design",
      "Social Media Assets"
    ]
  },
  business_automation: {
    label: "Business Automation",
    options: [
      "Workflow Automation",
      "Data Processing",
      "CRM Integration",
      "Custom Solutions"
    ]
  },
  digital_marketing: {
    label: "Digital Marketing",
    options: [
      "SEO Strategy",
      "Content Marketing",
      "Social Media",
      "Email Campaigns"
    ]
  }
};

// Booking time slots
const bookingTimeSlots = [
  { id: "slot_1", day: "Mon", date: "May 15", time: "10:00 AM" },
  { id: "slot_2", day: "Tue", date: "May 16", time: "2:00 PM" },
  { id: "slot_3", day: "Wed", date: "May 17", time: "11:30 AM" },
  { id: "slot_4", day: "Thu", date: "May 18", time: "4:00 PM" },
  { id: "slot_5", day: "Fri", date: "May 19", time: "1:00 PM" }
];

// Omeru personality types
const omeruPersonalities = {
  friendly: {
    greetings: [
      "Hi there! I'm Omeru, excited to help you explore our services!",
      "Hello! I'm Omeru, your friendly guide to finding the perfect digital solution."
    ],
    responses: [
      "That's a great choice! Let's explore this further.",
      "Excellent! I'm happy to help you with that.",
      "Perfect! This is an area where we truly excel."
    ],
    bookingPrompt: "Would you like to book a free consultation to discuss this further?"
  },
  professional: {
    greetings: [
      "Welcome to Omeru Digital. I'm your AI assistant, ready to guide you through our solutions.",
      "Greetings. I'm Omeru, here to help you find the optimal solution for your business needs."
    ],
    responses: [
      "Understood. Let me outline how we can assist with this requirement.",
      "This is one of our core competencies. Let me provide more information.",
      "Noted. We have extensive experience in this domain."
    ],
    bookingPrompt: "Would you like to schedule a consultation with one of our specialists to discuss implementation options?"
  },
  technical: {
    greetings: [
      "Hello. Omeru system initialized. How can I assist with your technical requirements today?",
      "Welcome. I'm Omeru, your technical advisor for system integration and development solutions."
    ],
    responses: [
      "Analyzing your selection. This is a technically complex area where our expertise can be leveraged.",
      "Processing request. This selection requires specialized technical knowledge which our team possesses.",
      "Technical parameters noted. We can implement custom solutions in this domain."
    ],
    bookingPrompt: "Would you like to schedule a technical consultation to discuss specifications and implementation details?"
  }
};

const Hero = () => {
  const [activeTab, setActiveTab] = useState<string>('web_development');
  
  // Chat state
  const [conversation, setConversation] = useState<Array<{from: 'ai' | 'user', text: string}>>([]);
  const [currentStage, setCurrentStage] = useState<'initial' | 'service_selection' | 'project_details' | 'booking' | 'confirmed'>('initial');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [omeruPersonality, setOmeruPersonality] = useState<'friendly' | 'professional' | 'technical'>('friendly');
  const [aiReady, setAiReady] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Dynamic options based on conversation stage
  const getOptions = () => {
    switch(currentStage) {
      case 'initial':
        return Object.keys(serviceCategories).map(key => ({
          value: key,
          label: serviceCategories[key as keyof typeof serviceCategories].label
        }));
      case 'service_selection':
        if (!selectedService) return [];
        return serviceCategories[selectedService as keyof typeof serviceCategories].options.map(option => ({
          value: option.toLowerCase().replace(/\s+/g, '_'),
          label: option
        }));
      case 'project_details':
        return [
          { value: 'proceed_to_booking', label: 'Schedule a Consultation' },
          { value: 'ask_questions', label: 'I Have More Questions' },
          { value: 'share_info', label: 'Send Info Materials' }
        ];
      case 'booking':
        return bookingTimeSlots.map(slot => ({
          value: slot.id,
          label: `${slot.day}, ${slot.date} - ${slot.time}`
        }));
      case 'confirmed':
        return [
          { value: 'restart', label: 'Explore Other Services' },
          { value: 'contact', label: 'Contact Team Directly' }
        ];
      default:
        return [];
    }
  };
  
  // Effect to detect personality based on user selections
  useEffect(() => {
    if (selectedService) {
      // Set personality based on service type
      if (['web_development', 'mobile_development'].includes(selectedService)) {
        setOmeruPersonality('technical');
      } else if (['business_automation', 'digital_marketing'].includes(selectedService)) {
        setOmeruPersonality('professional');
      } else {
        setOmeruPersonality('friendly');
      }
    }
  }, [selectedService]);
  
  // Terminal effect initialization
  useEffect(() => {
    const initTimeout = setTimeout(() => {
      setAiReady(true);
      startConversation();
    }, 1200);
    
    return () => clearTimeout(initTimeout);
  }, []);
  
  // Scroll to bottom of chat when new messages appear - modified to prevent page scrolling
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [conversation]);
  
  // Initialize conversation
  const startConversation = () => {
    setIsTyping(true);
    
    // Random greeting from current personality
    const greeting = omeruPersonalities[omeruPersonality].greetings[
      Math.floor(Math.random() * omeruPersonalities[omeruPersonality].greetings.length)
    ];
    
    // Simulate typing effect for AI message
    setTimeout(() => {
      setConversation([{ 
        from: 'ai', 
        text: greeting + " What service are you interested in exploring today?"
      }]);
      setIsTyping(false);
      setTimeout(() => {
        setShowOptions(true);
        setCurrentStage('initial');
      }, 500);
    }, 1000);
  };
  
  // Handle user selection
  const handleOptionSelect = (value: string) => {
    // Find the selected option label
    let optionLabel = "";
    const options = getOptions();
    const selectedOption = options.find(opt => opt.value === value);
    
    if (selectedOption) {
      optionLabel = selectedOption.label;
    }
    
    // Add user message
    setConversation(prev => [...prev, { from: 'user', text: optionLabel }]);
    setShowOptions(false);
    
    // Process based on current stage
    switch (currentStage) {
      case 'initial':
        setSelectedService(value);
        processServiceSelection(value, optionLabel);
        break;
      case 'service_selection':
        processSubServiceSelection(value, optionLabel);
        break;
      case 'project_details':
        processProjectDetails(value);
        break;
      case 'booking':
        processBookingSelection(value, optionLabel);
        break;
      case 'confirmed':
        if (value === 'restart') {
          // Reset and start over
          setConversation([]);
          setSelectedService(null);
          setCurrentStage('initial');
          startConversation();
        }
        break;
    }
  };
  
  // Process service category selection
  const processServiceSelection = (value: string, label: string) => {
    setIsTyping(true);
    
    // Choose a random response from personality type
    const response = omeruPersonalities[omeruPersonality].responses[
      Math.floor(Math.random() * omeruPersonalities[omeruPersonality].responses.length)
    ];
    
    setTimeout(() => {
      setConversation(prev => [...prev, { 
        from: 'ai', 
        text: `${response} What specific ${label.toLowerCase()} service are you looking for?` 
      }]);
      setIsTyping(false);
      setTimeout(() => {
        setShowOptions(true);
        setCurrentStage('service_selection');
      }, 500);
    }, 1000);
  };
  
  // Process sub-service selection
  const processSubServiceSelection = (value: string, label: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setConversation(prev => [...prev, { 
        from: 'ai', 
        text: `Great choice! ${label} is one of our specialties. Our team has extensive experience delivering customized solutions in this area that help businesses streamline operations and achieve their goals.` 
      }]);
      
      // Wait a bit, then follow up with a question
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          from: 'ai', 
          text: omeruPersonalities[omeruPersonality].bookingPrompt 
        }]);
        setIsTyping(false);
        setTimeout(() => {
          setShowOptions(true);
          setCurrentStage('project_details');
        }, 500);
      }, 1500);
    }, 1200);
  };
  
  // Process project details and move to booking
  const processProjectDetails = (value: string) => {
    setIsTyping(true);
    
    if (value === 'proceed_to_booking') {
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          from: 'ai', 
          text: 'Excellent! Please select a time that works for you, and our team will be prepared to discuss your project in detail.' 
        }]);
        setIsTyping(false);
        setTimeout(() => {
          setShowOptions(true);
          setCurrentStage('booking');
        }, 500);
      }, 1000);
    } else if (value === 'ask_questions') {
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          from: 'ai', 
          text: 'Of course! Feel free to use the contact form below with your specific questions, and our team will get back to you promptly. Alternatively, you can schedule a consultation to discuss everything in detail.' 
        }]);
        setIsTyping(false);
        setTimeout(() => {
          setShowOptions(true);
          setCurrentStage('booking');
        }, 500);
      }, 1000);
    } else {
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          from: 'ai', 
          text: "I'll make sure you receive our comprehensive information materials. To better tailor them to your needs, it would be helpful to schedule a brief call to understand your specific requirements." 
        }]);
        setIsTyping(false);
        setTimeout(() => {
          setShowOptions(true);
          setCurrentStage('booking');
        }, 1000);
      }, 1000);
    }
  };
  
  // Process booking selection
  const processBookingSelection = (value: string, label: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setConversation(prev => [...prev, { 
        from: 'ai', 
        text: `Perfect! Your consultation is confirmed for ${label}. You'll receive a calendar invitation and confirmation email shortly with all the details. Our team is looking forward to meeting with you!` 
      }]);
      setIsTyping(false);
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          from: 'ai', 
          text: 'Is there anything specific you would like us to prepare for the consultation? Any particular aspects of your project you&apos;d like us to focus on?' 
        }]);
        setTimeout(() => {
          setShowOptions(true);
          setCurrentStage('confirmed');
        }, 500);
      }, 1500);
    }, 1200);
  };

  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-12 relative bg-[#111111]">
      {/* Minimal header */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-32">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center mr-2">
              <span className="text-white text-xs font-medium">O</span>
            </div>
            <span className="text-white text-sm">omeru digital</span>
          </div>
          
          <div className="flex items-center space-x-8">
            <span className="text-white/60 text-sm">Services</span>
            <span className="text-white/60 text-sm">Work</span>
            <span className="text-white/60 text-sm">About</span>
            <span className="text-white/60 text-sm">Contact</span>
          </div>
        </div>
        
        {/* Hero headline */}
        <div className="mb-32 text-center">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-4">
            OMERU PRO
            <span className="inline-flex items-center justify-center ml-3 bg-blue-500 text-white text-sm px-2 py-1 rounded-md align-top mt-6">
              v1.0
            </span>
          </h1>
          <div className="text-white/60 uppercase tracking-widest text-sm mt-3">
            M U L T I P U R P O S E
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left panel */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5 h-[400px] flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-30" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 70%)' }}></div>
            
            <div className="relative z-10">
              <div className="p-3 bg-[#222] rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white text-xs">O</span>
                  </div>
                  <span className="ml-2 text-white/80 text-xs">omeru</span>
                </div>
                <p className="text-white/80 text-sm">How can I help with your digital ecosystem today?</p>
              </div>
              
              {/* Options */}
              {currentStage === 'initial' && (
                <div className="space-y-2">
                  {Object.keys(serviceCategories).map((key) => (
                    <button
                      key={key}
                      onClick={() => handleOptionSelect(key)}
                      className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-sm text-left flex items-center transition-all"
                    >
                      <div className="w-3 h-3 rounded-full bg-white/10 mr-2"></div>
                      {serviceCategories[key as keyof typeof serviceCategories].label}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Dynamic options for other stages */}
              {currentStage !== 'initial' && showOptions && (
                <div className="space-y-2">
                  {getOptions().map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect(option.value)}
                      className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-sm text-left flex items-center transition-all"
                    >
                      <div className="w-3 h-3 rounded-full bg-white/10 mr-2"></div>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex space-x-1 mt-4 ml-2">
                  <motion.div 
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div 
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div 
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
              )}
            </div>
            
            {/* Action button */}
            <div className="mt-auto">
              <button 
                className="w-full py-2 px-4 rounded-md bg-blue-500 text-white text-sm font-medium"
                onClick={() => {
                  if (!aiReady) {
                    setAiReady(true);
                    startConversation();
                  }
                }}
              >
                {aiReady ? "Start Over" : "Connect with Omeru"}
              </button>
            </div>
          </div>
          
          {/* Middle panel - chat interaction */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5 h-[400px] flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-30" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 70%)' }}></div>
            
            <div className="relative z-10 flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {/* Conversation history */}
              <div className="space-y-4">
                {conversation.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[90%] p-3 rounded-lg ${
                        message.from === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/5 text-white/80'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Welcome message when empty */}
              {conversation.length === 0 && !isTyping && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                        <path d="M8 12H16" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M12 8V16" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                    <p className="text-white/60 text-sm">
                      Select a service from the panel on the left to get started
                    </p>
                  </div>
                </div>
              )}
              
              {/* End of messages reference point */}
              <div ref={chatEndRef} className="h-2" />
            </div>
          </div>
          
          {/* Right panel - visualization */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5 h-[400px] flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-30" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 70%)' }}></div>
            
            <div className="relative z-10 h-full flex items-center justify-center">
              {selectedService ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <div className="w-8 h-8 bg-white/5 rounded-md flex items-center justify-center">
                      <span className="text-blue-400 text-lg">O</span>
                    </div>
                  </div>
                  <p className="text-white font-medium mb-1">
                    {selectedService && serviceCategories[selectedService as keyof typeof serviceCategories].label}
                  </p>
                  <p className="text-white/60 text-sm">
                    Streamlined solutions for modern businesses
                  </p>
                  
                  <div className="mt-6 flex justify-center space-x-2">
                    {[1, 2, 3].map((dot) => (
                      <div 
                        key={dot} 
                        className={`w-2 h-2 rounded-full ${
                          dot === 1 ? 'bg-blue-400' : 'bg-white/20'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-4 text-white/20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 9L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <p className="text-white/40 text-sm">Select a service to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Minimal categories */}
        <div className="mt-16 flex justify-center space-x-8">
          {Object.keys(serviceCategories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`text-sm transition-all ${
                activeTab === key
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {serviceCategories[key as keyof typeof serviceCategories].label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero; 