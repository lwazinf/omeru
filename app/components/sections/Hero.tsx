'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './hero.module.css';

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
  // State for theme
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
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
  
  // Add new state for tracking current question
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  // Add ref for horizontal scrolling container
  const optionsScrollRef = useRef<HTMLDivElement>(null);
  // Add state to detect if on mobile
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
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
  
  // Theme toggle function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  // Effect to sync theme with body class
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);
  
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
    
    // Set the current question for mobile display
    const question = "What service are you interested in exploring today?";
    setCurrentQuestion(question);
    
    // Simulate typing effect for AI message
    setTimeout(() => {
      setConversation([{ 
        from: 'ai', 
        text: greeting + " " + question
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
  
  // Modify processServiceSelection to update current question
  const processServiceSelection = (value: string, label: string) => {
    // Get a response from the current personality
    const response = omeruPersonalities[omeruPersonality].responses[
      Math.floor(Math.random() * omeruPersonalities[omeruPersonality].responses.length)
    ];
    
    const question = `What type of ${label.toLowerCase()} are you looking for?`;
    setCurrentQuestion(question);
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setConversation(prev => [...prev, { 
        from: 'ai', 
        text: `${response} ${question}`
      }]);
      setIsTyping(false);
      setTimeout(() => {
        setShowOptions(true);
        setCurrentStage('service_selection');
      }, 500);
    }, 1500);
  };
  
  // Modify processSubServiceSelection to update current question
  const processSubServiceSelection = (value: string, label: string) => {
    // Get a response from the current personality
    const response = omeruPersonalities[omeruPersonality].responses[
      Math.floor(Math.random() * omeruPersonalities[omeruPersonality].responses.length)
    ];
    
    // Include the selected option in the question for context
    const question = `Can you tell me a bit more about your ${label} project requirements?`;
    setCurrentQuestion(question);
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setConversation(prev => [...prev, { 
        from: 'ai', 
        text: `${response} ${question}`
      }]);
      setIsTyping(false);
      setTimeout(() => {
        setShowOptions(true);
        setCurrentStage('project_details');
      }, 500);
    }, 1500);
  };
  
  // Modify processProjectDetails to update current question
  const processProjectDetails = (value: string) => {
    if (value === 'proceed_to_booking') {
      const bookingPrompt = omeruPersonalities[omeruPersonality].bookingPrompt;
      setCurrentQuestion(bookingPrompt);
      
      setIsTyping(true);
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          from: 'ai', 
          text: bookingPrompt
        }]);
        setIsTyping(false);
        setTimeout(() => {
          setShowOptions(true);
          setCurrentStage('booking');
        }, 500);
      }, 1500);
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
  
  // Modify processBookingSelection to update current question
  const processBookingSelection = (value: string, label: string) => {
    const confirmationMessage = `Great! I've scheduled your consultation for ${label}. You'll receive a confirmation email shortly with details and a calendar invite.`;
    setCurrentQuestion("Would you like to explore other services or contact our team directly?");
    
    setIsTyping(true);
    setTimeout(() => {
      setConversation(prev => [...prev, { 
        from: 'ai', 
        text: confirmationMessage
      }]);
      setIsTyping(false);
      setTimeout(() => {
        setShowOptions(true);
        setCurrentStage('confirmed');
      }, 500);
    }, 1500);
  };

  // Theme-based style variables
  const themeStyles = {
    dark: {
      bgGradient: 'bg-gradient-to-b from-[#0f0f0f] to-[#161616]',
      panelBg: 'bg-gradient-to-br from-[#1A1A1A] to-[#222]',
      panelBorder: 'border-white/10',
      textPrimary: 'text-white',
      textSecondary: 'text-white/60',
      textTertiary: 'text-white/40',
      headerBg: 'bg-white/5',
      inputBg: 'bg-white/5',
      inputBgHover: 'hover:bg-white/10',
      inputBorder: 'border-white/5',
      inputBorderHover: 'hover:border-white/15',
      buttonGradient: 'from-blue-600 to-blue-500',
      buttonHoverGradient: 'hover:from-blue-500 hover:to-blue-400',
      buttonBorder: 'border-blue-400/20',
      messageBg: 'bg-white/8',
      messageBorder: 'border-white/10',
      headingBg: 'bg-[#222]',
      indicatorBg: 'bg-blue-400',
      timelineBg: 'bg-white/5',
      timelineFill: 'from-blue-500 to-blue-400',
      dotActiveBg: 'bg-blue-400',
      dotInactiveBg: 'bg-white/20',
      tabActiveBg: 'bg-white/10',
      tabActiveBorder: 'border-white/10',
      shadow: 'shadow-black/30',
      headerTextBg: 'bg-white/5',
      iconBg: 'bg-white/10',
      border: 'border-white/10',
      badgeBg: 'bg-blue-900/30',
      tagText: 'text-blue-300',
    },
    light: {
      bgGradient: 'bg-gradient-to-b from-[#f0f4f8] to-[#e6eef5]',
      panelBg: 'bg-gradient-to-br from-white to-[#f5f7fa]',
      panelBorder: 'border-gray-200',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-600',
      textTertiary: 'text-gray-500',
      headerBg: 'bg-gray-100',
      inputBg: 'bg-gray-100',
      inputBgHover: 'hover:bg-gray-200',
      inputBorder: 'border-gray-200',
      inputBorderHover: 'hover:border-gray-300',
      buttonGradient: 'from-blue-500 to-blue-400',
      buttonHoverGradient: 'hover:from-blue-400 hover:to-blue-300',
      buttonBorder: 'border-blue-300/50',
      messageBg: 'bg-gray-100',
      messageBorder: 'border-gray-200',
      headingBg: 'bg-gray-100',
      indicatorBg: 'bg-blue-500',
      timelineBg: 'bg-gray-100',
      timelineFill: 'from-blue-500 to-blue-400',
      dotActiveBg: 'bg-blue-500',
      dotInactiveBg: 'bg-gray-300',
      tabActiveBg: 'bg-blue-50',
      tabActiveBorder: 'border-blue-200',
      shadow: 'shadow-gray-300/30',
      headerTextBg: 'bg-blue-50',
      iconBg: 'bg-gray-100',
      border: 'border-gray-200',
      badgeBg: 'bg-blue-50',
      tagText: 'text-blue-600',
    }
  };

  // Current theme styling
  const ts = themeStyles[theme];

  // Add effect for horizontal scroll touch handling
  useEffect(() => {
    if (!optionsScrollRef.current || !isMobile) return;
    
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    
    const optionsEl = optionsScrollRef.current;
    
    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isDown = true;
      optionsEl.classList.add('active');
      
      if ('touches' in e) {
        startX = e.touches[0].pageX - optionsEl.offsetLeft;
      } else {
        startX = e.pageX - optionsEl.offsetLeft;
      }
      
      scrollLeft = optionsEl.scrollLeft;
    };
    
    const onMouseLeave = () => {
      isDown = false;
      optionsEl.classList.remove('active');
    };
    
    const onMouseUp = () => {
      isDown = false;
      optionsEl.classList.remove('active');
    };
    
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();
      
      let x: number;
      if ('touches' in e) {
        x = e.touches[0].pageX - optionsEl.offsetLeft;
      } else {
        x = e.pageX - optionsEl.offsetLeft;
      }
      
      const walk = (x - startX) * 2; // Scroll multiplier
      optionsEl.scrollLeft = scrollLeft - walk;
    };
    
    // Mouse events
    optionsEl.addEventListener('mousedown', onMouseDown);
    optionsEl.addEventListener('mouseleave', onMouseLeave);
    optionsEl.addEventListener('mouseup', onMouseUp);
    optionsEl.addEventListener('mousemove', onMouseMove);
    
    // Touch events
    optionsEl.addEventListener('touchstart', onMouseDown);
    optionsEl.addEventListener('touchend', onMouseUp);
    optionsEl.addEventListener('touchmove', onMouseMove);
    
    return () => {
      // Cleanup event listeners
      optionsEl.removeEventListener('mousedown', onMouseDown);
      optionsEl.removeEventListener('mouseleave', onMouseLeave);
      optionsEl.removeEventListener('mouseup', onMouseUp);
      optionsEl.removeEventListener('mousemove', onMouseMove);
      
      optionsEl.removeEventListener('touchstart', onMouseDown);
      optionsEl.removeEventListener('touchend', onMouseUp);
      optionsEl.removeEventListener('touchmove', onMouseMove);
    };
  }, [isMobile]);

  return (
    <section className={`w-full py-16 md:py-24 px-6 md:px-12 relative ${ts.bgGradient} ${isMobile && showOptions ? 'pb-32' : ''}`}>
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-500/5 blur-[100px] z-0"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] z-0"></div>
      
      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={toggleTheme}
          className={`p-2.5 rounded-full ${ts.panelBg} ${ts.panelBorder} border flex items-center justify-center transition-all duration-300 ${ts.shadow}`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2V4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 20V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.93 4.93L6.34 6.34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.66 17.66L19.07 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 12H22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.93 19.07L6.34 17.66" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.66 6.34L19.07 4.93" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
      
      {/* Main content area */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero headline */}
        <div className="mb-20 text-center">
          <div className="flex justify-center mb-6">
            <img src="/LwaziNF.png" alt="Omeru Digital Logo" className="w-24 h-24" />
          </div>
          <div className={`mb-4 inline-block px-3 py-1 ${ts.headerTextBg} rounded-full ${ts.textSecondary} text-xs uppercase tracking-wider`}>Next-Gen Digital Solutions</div>
          <h1 className={`text-6xl md:text-8xl font-display font-bold ${ts.textPrimary} mb-6 tracking-tight`}>
            OMERU PRO
            <span className="inline-flex items-center justify-center ml-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm px-3 py-1 rounded-md align-top mt-6">
              v1.0
            </span>
          </h1>
          <div className={`${ts.textSecondary} uppercase tracking-widest text-sm mt-3 font-light`}>
            MULTIPURPOSE DIGITAL ECOSYSTEM
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Left panel */}
          <div className={`${ts.panelBg} rounded-2xl p-6 ${ts.panelBorder} border min-h-[450px] md:h-[500px] flex flex-col relative overflow-hidden shadow-xl ${ts.shadow} ${isMobile ? 'md:block hidden' : ''}`}>
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-30" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 70%)' }}></div>
            
            <div className="relative z-10">
              <div className={`p-4 ${ts.headingBg} rounded-xl mb-6 ${ts.panelBorder} border shadow-lg ${ts.shadow}`}>
                <div className="flex items-center mb-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600/20 flex items-center justify-center overflow-hidden">
                    <img src="/LwaziNF.png" alt="" className="w-4 h-4" />
                  </div>
                  <span className={`ml-2 ${ts.textPrimary} text-sm font-medium`}>omeru assistant</span>
                </div>
                <p className={`${ts.textSecondary} text-sm`}>How can I help with your digital ecosystem today?</p>
              </div>
              
              {/* Options - Desktop version only */}
              {currentStage === 'initial' && !isMobile && (
                <div className="space-y-2.5">
                  {Object.keys(serviceCategories).map((key) => (
                    <button
                      key={key}
                      onClick={() => handleOptionSelect(key)}
                      className={`w-full p-3 rounded-xl ${ts.inputBg} ${ts.inputBgHover} ${ts.inputBorderHover} ${ts.textSecondary} hover:${ts.textPrimary} text-sm text-left flex items-center transition-all duration-200 ease-out ${ts.inputBorder} border shadow-sm ${ts.shadow}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mr-3 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      {serviceCategories[key as keyof typeof serviceCategories].label}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Dynamic options for other stages - Desktop version only */}
              {currentStage !== 'initial' && showOptions && !isMobile && (
                <div className="space-y-2.5">
                  {getOptions().map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect(option.value)}
                      className={`w-full p-3 rounded-xl ${ts.inputBg} ${ts.inputBgHover} ${ts.inputBorderHover} ${ts.textSecondary} hover:${ts.textPrimary} text-sm text-left flex items-center transition-all duration-200 ease-out ${ts.inputBorder} border shadow-sm ${ts.shadow}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mr-3 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center mt-3 ml-2 group">
                  <div className="flex-shrink-0 mr-2">
                    <div className={`w-6 h-6 rounded-full ${ts.iconBg} flex items-center justify-center overflow-hidden border ${ts.border} ${styles.avatarPulse}`}>
                      <img src="/LwaziNF.png" alt="" className="w-4 h-4" />
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${ts.messageBg} ${ts.messageBorder} border ${ts.shadow} inline-flex items-center`}>
                    <div className={styles.typingIndicator}>
                      <div className={`${styles.typingDot} ${ts.indicatorBg}`}></div>
                      <div className={`${styles.typingDot} ${ts.indicatorBg}`}></div>
                      <div className={`${styles.typingDot} ${ts.indicatorBg}`}></div>
                    </div>
                    <span className={`ml-2 text-xs opacity-70 ${ts.textSecondary} hidden group-hover:inline`}>Omeru is typing...</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Action button */}
            <div className="mt-auto">
              <button 
                className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${ts.buttonGradient} ${ts.buttonHoverGradient} text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-blue-900/20 ${ts.buttonBorder} border`}
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
          <div className={`${ts.panelBg} rounded-2xl p-6 ${ts.panelBorder} border min-h-[450px] md:h-[500px] flex flex-col relative overflow-hidden shadow-xl ${ts.shadow} ${styles.chatContainer}`}>
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-30" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 70%)' }}></div>
            
            <div className={`flex items-center justify-between mb-4 pb-3 border-b ${ts.panelBorder}`}>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-5 h-5 ${ts.iconBg} rounded-full mr-2 overflow-hidden border ${ts.border}`}>
                  <img src="/LwaziNF.png" alt="" className="w-3 h-3" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className={`${ts.textPrimary} text-xs font-medium`}>Omeru Assistant</span>
                    <div className={`ml-2 flex items-center px-1.5 py-0.5 rounded-full ${ts.badgeBg}`}>
                      <div className={`w-1.5 h-1.5 ${ts.indicatorBg} rounded-full mr-1 animate-pulse`}></div>
                      <span className={`text-[9px] ${ts.tagText}`}>ONLINE</span>
                    </div>
                  </div>
                  <span className={`${ts.textTertiary} text-[10px]`}>Available 24/7 to assist you</span>
                </div>
              </div>
              <button className={`w-6 h-6 ${ts.iconBg} rounded-full flex items-center justify-center ${ts.border} border hover:opacity-80 transition-opacity`}>
                <svg className={`w-3 h-3 ${ts.textSecondary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
            
            <div className={`relative z-10 flex-1 overflow-y-auto pr-2 ${styles.chatContainer}`}>
              {/* Conversation history */}
              <div className="space-y-5 py-2">
                {conversation.map((message, index) => {
                  // Generate a timestamp for the message
                  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const isFirstInSequence = index === 0 || conversation[index - 1].from !== message.from;
                  const isLastInSequence = index === conversation.length - 1 || conversation[index + 1].from !== message.from;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 120, damping: 10 }}
                      className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'} relative group`}
                    >
                      {/* Avatar - Only show on first message in sequence */}
                      {message.from === 'ai' && isFirstInSequence && (
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className={`w-6 h-6 rounded-full ${ts.iconBg} flex items-center justify-center overflow-hidden border ${ts.border} ${styles.avatarPulse}`}>
                            <img src="/LwaziNF.png" alt="" className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                      
                      <div 
                        className={`relative max-w-[85%] p-3.5 ${
                          message.from === 'user' 
                            ? `rounded-t-xl rounded-bl-xl rounded-br-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/20 ml-6 ${styles.messageBubbleUser}` 
                            : `rounded-t-xl rounded-br-xl rounded-bl-sm ${ts.messageBg} ${ts.messageBorder} border ${ts.textPrimary} shadow-md ${ts.shadow} mr-6 ${styles.messageBubbleAi}`
                        } ${!isLastInSequence ? 'mb-1.5' : ''}`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        
                        {/* Timestamp */}
                        <div className={`absolute ${message.from === 'user' ? 'right-2 -bottom-5' : 'left-2 -bottom-5'} opacity-0 group-hover:opacity-70 transition-opacity text-[10px] ${ts.textTertiary}`}>
                          {timestamp}
                        </div>
                        
                        {/* Message tail */}
                        {isLastInSequence && (
                          <div className={`absolute ${message.from === 'user' ? '-right-2 bottom-0' : '-left-2 bottom-0'}`}>
                            <div className={`w-2 h-2 ${
                              message.from === 'user'
                                ? 'bg-blue-500'
                                : ts.messageBg
                            } transform ${message.from === 'user' ? 'rotate-45' : '-rotate-45'}`}
                            ></div>
                          </div>
                        )}
                      </div>
                      
                      {/* User Avatar - Only show on first message in sequence */}
                      {message.from === 'user' && isFirstInSequence && (
                        <div className="flex-shrink-0 ml-2 mt-1">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden border ${ts.border}`}>
                            <span className="text-[10px] text-white font-medium">You</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Welcome message when empty */}
              {conversation.length === 0 && !isTyping && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-xs">
                    <motion.div
                      className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-600/30 to-indigo-600/20 flex items-center justify-center mb-8 ${ts.panelBorder} border shadow-lg ${ts.shadow}`}
                      animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0, -2, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <img src="/LwaziNF.png" alt="Omeru Digital" className="w-12 h-12" />
                    </motion.div>
                    <h3 className={`${ts.textPrimary} text-lg font-medium mb-3`}>
                      Welcome to Omeru Digital
                    </h3>
                    <p className={`${ts.textSecondary} text-sm mb-6`}>
                      I&apos;m your intelligent AI assistant, ready to help you explore our services and find the perfect solution for your needs.
                    </p>
                    <div className={`${ts.badgeBg} p-3 rounded-lg inline-block`}>
                      <p className={`${ts.tagText} text-xs`}>
                        Select a service from the options to start our conversation
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* End of messages reference point */}
              <div ref={chatEndRef} className="h-2" />
            </div>
          </div>
          
          {/* Right panel - visualization */}
          <div className={`${ts.panelBg} rounded-2xl p-6 ${ts.panelBorder} border min-h-[450px] md:h-[500px] flex flex-col relative overflow-hidden shadow-xl ${ts.shadow}`}>
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-30" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 70%)' }}></div>
            
            <div className={`flex items-center justify-between mb-4 pb-3 border-b ${ts.panelBorder}`}>
              <div className="flex items-center">
                <div className={`w-2 h-2 ${ts.indicatorBg} rounded-full mr-2`}></div>
                <span className={`${ts.textSecondary} text-xs`}>SERVICE DETAILS</span>
              </div>
              <div className="flex space-x-1">
                <div className={`w-1.5 h-1.5 ${ts.dotInactiveBg} rounded-full`}></div>
                <div className={`w-1.5 h-1.5 ${ts.dotInactiveBg} rounded-full`}></div>
                <div className={`w-1.5 h-1.5 ${ts.dotInactiveBg} rounded-full`}></div>
              </div>
            </div>
            
            <div className="relative z-10 h-full flex items-center justify-center">
              {selectedService ? (
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/10 flex items-center justify-center mb-6 ${ts.panelBorder} border`}>
                    <div className={`w-10 h-10 ${ts.inputBg} rounded-md flex items-center justify-center`}>
                      <span className="text-blue-400 text-xl font-medium">O</span>
                    </div>
                  </div>
                  <p className={`${ts.textPrimary} font-medium text-lg mb-2`}>
                    {selectedService && serviceCategories[selectedService as keyof typeof serviceCategories].label}
                  </p>
                  <p className={`${ts.textSecondary} text-sm max-w-[250px] mx-auto`}>
                    Streamlined solutions designed to transform your business operations and enhance digital presence
                  </p>
                  
                  <div className={`mt-8 ${ts.timelineBg} p-4 rounded-lg ${ts.panelBorder} border`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`${ts.textSecondary} text-xs`}>PROJECT TIMELINE</span>
                      <span className="text-blue-400 text-xs">4-6 weeks</span>
                    </div>
                    <div className={`h-1.5 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div className={`h-full w-[75%] bg-gradient-to-r ${ts.timelineFill} rounded-full`}></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center space-x-2">
                    {[1, 2, 3].map((dot) => (
                      <div 
                        key={dot} 
                        className={`w-2 h-2 rounded-full ${
                          dot === 1 ? ts.dotActiveBg : ts.dotInactiveBg
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <svg className={`w-16 h-16 mx-auto mb-6 ${theme === 'dark' ? 'text-white/10' : 'text-gray-300'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 9L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <p className={`${ts.textTertiary} text-sm`}>Select a service to view details</p>
                  <p className={`${theme === 'dark' ? 'text-white/30' : 'text-gray-400'} text-xs mt-2`}>Comprehensive information will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Service categories - Desktop */}
        <div className="mt-16 hidden md:flex justify-center md:items-center flex-wrap md:flex-nowrap gap-4 md:gap-0 md:space-x-10">
          {Object.keys(serviceCategories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`text-sm px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === key
                  ? `${ts.tabActiveBg} ${ts.textPrimary} shadow-sm ${ts.shadow} ${ts.tabActiveBorder} border`
                  : `${ts.textTertiary} hover:${ts.textSecondary}`
              }`}
            >
              {serviceCategories[key as keyof typeof serviceCategories].label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile options UI fixed at bottom */}
      {isMobile && showOptions && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
          {/* Current question display */}
          <div className={`${ts.panelBg} p-3 ${ts.panelBorder} border-t border-x w-full ${ts.textPrimary} text-center font-medium text-sm shadow-lg ${ts.shadow}`}>
            {currentQuestion}
            {isTyping && (
              <div className="flex justify-center space-x-1.5 mt-2">
                <motion.div 
                  className={`w-1.5 h-1.5 ${ts.indicatorBg} rounded-full`}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div 
                  className={`w-1.5 h-1.5 ${ts.indicatorBg} rounded-full`}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div 
                  className={`w-1.5 h-1.5 ${ts.indicatorBg} rounded-full`}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                />
              </div>
            )}
          </div>
          
          {/* Scrollable options */}
          <div 
            ref={optionsScrollRef}
            className={`${ts.panelBg} p-3 ${ts.panelBorder} border-t border-x border-b overflow-x-auto flex space-x-3 pb-6 pt-2 px-4 whitespace-nowrap`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', touchAction: 'pan-x' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
              div.active {
                cursor: grabbing;
              }
            `}</style>
            
            {getOptions().map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl ${ts.inputBg} ${ts.inputBgHover} ${ts.inputBorderHover} ${ts.textSecondary} hover:${ts.textPrimary} text-sm text-center min-w-[150px] transition-all duration-200 ease-out ${ts.inputBorder} border shadow-sm ${ts.shadow}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {/* Optional: Add small indicator dots to show swipeable content */}
          <div className="flex justify-center mt-2 pb-1">
            <div className="flex space-x-1">
              {getOptions().length > 0 && getOptions().slice(0, Math.min(5, getOptions().length)).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full ${i === 0 ? ts.dotActiveBg : ts.dotInactiveBg}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero; 