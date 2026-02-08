'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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

type Stage =
  | 'initial'
  | 'service_selection'
  | 'project_details'
  | 'user_info'
  | 'project_goals'
  | 'project_nature'
  | 'project_timeline'
  | 'project_budget'
  | 'country'
  | 'inspiration'
  | 'booking_prompt'
  | 'booking'
  | 'confirmed';

const Hero = () => {
  // State for theme
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const [activeTab, setActiveTab] = useState<string>('web_development');
  
  // Chat state
  const [conversation, setConversation] = useState<Array<{from: 'ai' | 'user', text: string}>>([]);
  const [currentStage, setCurrentStage] = useState<Stage>('initial');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [omeruPersonality, setOmeruPersonality] = useState<'friendly' | 'professional' | 'technical'>('friendly');
  const [aiReady, setAiReady] = useState(false);
  
  // Add state for client information
  const [clientInfo, setClientInfo] = useState<{
    name: string;
    email: string;
    company: string;
    country: string;
    projectGoals: string;
    projectNature: string;
    timeline: string;
    budget: string;
    inspirationLinks: string;
  }>({
    name: '',
    email: '',
    company: '',
    country: '',
    projectGoals: '',
    projectNature: '',
    timeline: '',
    budget: '',
    inspirationLinks: ''
  });
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [textInputField, setTextInputField] = useState<keyof typeof clientInfo | null>(null);
  const [textInputPlaceholder, setTextInputPlaceholder] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  
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
          { value: 'proceed_to_user_info', label: 'Proceed to provide my details' },
          { value: 'ask_questions', label: 'I Have More Questions' }
        ];
      case 'booking_prompt':
        return [
          { value: 'proceed_to_booking', label: 'Continue to scheduling' },
          { value: 'skip_booking', label: 'Submit without scheduling a call' }
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
    // Instead of auto-starting with a timeout, just initialize aiReady
    // but don't start the conversation automatically
    const initTimeout = setTimeout(() => {
      setAiReady(true);
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
    
    // Add user message for most cases (when not using text input)
    if (!showTextInput) {
      setConversation(prev => [...prev, { from: 'user', text: optionLabel }]);
    }
    setShowOptions(false);
    
    // Process based on current stage
    switch (currentStage) {
      case 'initial':
        setSelectedService(value);
        setSelectedSubService(null);
        processServiceSelection(value, optionLabel);
        break;
      case 'service_selection':
        setSelectedSubService(optionLabel);
        processSubServiceSelection(value, optionLabel);
        break;
      case 'project_details':
        processProjectDetails(value);
        break;
      case 'booking_prompt':
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
        } else if (value === 'skip_booking') {
          const thankYouMessage = "Thank you for providing all this information! Our team will review it and get back to you via email soon.";
          setCurrentQuestion("Would you like to explore other services?");
          
          setIsTyping(true);
          setTimeout(() => {
            setConversation(prev => [...prev, { 
              from: 'ai', 
              text: thankYouMessage
            }]);
            setIsTyping(false);
            setTimeout(() => {
              setShowOptions(true);
              setCurrentStage('confirmed');
            }, 1500);
          }, 1500);
        }
        break;
      case 'booking':
        processBookingSelection(value, optionLabel);
        break;
      case 'confirmed':
        if (value === 'restart') {
          // Reset and start over
          setConversation([]);
          setSelectedService(null);
          setSelectedSubService(null);
          setClientInfo({
            name: '',
            email: '',
            company: '',
            country: '',
            projectGoals: '',
            projectNature: '',
            timeline: '',
            budget: '',
            inspirationLinks: ''
          });
          setCurrentStage('initial');
          startConversation();
        } else if (value === 'contact') {
          // Scroll to contact section
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
          
          // Clear the conversation
          setConversation([]);
          setSelectedService(null);
          setSelectedSubService(null);
          setClientInfo({
            name: '',
            email: '',
            company: '',
            country: '',
            projectGoals: '',
            projectNature: '',
            timeline: '',
            budget: '',
            inspirationLinks: ''
          });
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
  
  // Process project details selection
  const processProjectDetails = (value: string) => {
    if (value === 'proceed_to_user_info') {
      const promptMessage = "Great! To tailor the plan, could you share your name?";
      setCurrentQuestion(promptMessage);
      
      setIsTyping(true);
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          from: 'ai', 
          text: promptMessage
        }]);
        setIsTyping(false);
        setTextInputField('name');
        setTextInputPlaceholder('Your name');
        setTextInputValue('');
        setShowTextInput(true);
        setShowOptions(false);
        setCurrentStage('user_info');
      }, 1200);
    } else if (value === 'ask_questions') {
      setIsTyping(true);
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          from: 'ai', 
          text: 'Of course! Feel free to use the contact form below with your specific questions, and our team will get back to you promptly. Alternatively, you can schedule a consultation to discuss everything in detail.' 
        }]);
        setIsTyping(false);
        setTimeout(() => {
          setShowOptions(true);
          setCurrentStage('project_details');
        }, 500);
      }, 1000);
    }
  };

  const advanceToTextPrompt = ({
    promptMessage,
    field,
    placeholder,
    nextStage
  }: {
    promptMessage: string;
    field: keyof typeof clientInfo;
    placeholder: string;
    nextStage: Stage;
  }) => {
    setCurrentQuestion(promptMessage);
    setIsTyping(true);
    setTimeout(() => {
      setConversation(prev => [...prev, { 
        from: 'ai', 
        text: promptMessage
      }]);
      setIsTyping(false);
      setTextInputField(field);
      setTextInputPlaceholder(placeholder);
      setTextInputValue('');
      setShowTextInput(true);
      setShowOptions(false);
      setCurrentStage(nextStage);
    }, 1200);
  };

  // Process user information
  const processUserInfo = () => {
    if (textInputField === 'name') {
      // Save name and ask for email
      setClientInfo(prev => ({ ...prev, name: textInputValue }));
      
      const promptMessage = `Thanks ${textInputValue}! Could you also share your email address where we can reach you?`;
      setCurrentQuestion(promptMessage);
      
      setIsTyping(true);
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          from: 'ai', 
          text: promptMessage
        }]);
        setIsTyping(false);
        setTextInputField('email');
        setTextInputPlaceholder('Your email address');
        setTextInputValue('');
        setShowTextInput(true);
      }, 1200);
    } else if (textInputField === 'email') {
      // Save email and ask for company
      setClientInfo(prev => ({ ...prev, email: textInputValue }));
      
      const promptMessage = "Thanks! What company or organization are you with?";
      setCurrentQuestion(promptMessage);
      
      setIsTyping(true);
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          from: 'ai', 
          text: promptMessage
        }]);
        setIsTyping(false);
        setTextInputField('company');
        setTextInputPlaceholder('Your company or organization');
        setTextInputValue('');
        setShowTextInput(true);
      }, 1200);
    } else if (textInputField === 'company') {
      setClientInfo(prev => ({ ...prev, company: textInputValue }));

      advanceToTextPrompt({
        promptMessage: "Perfect! What are the primary goals for this project?",
        field: 'projectGoals',
        placeholder: 'Describe the outcomes you want to achieve',
        nextStage: 'project_goals'
      });
    }
  };

  const processProjectGoalsInput = () => {
    setClientInfo(prev => ({ ...prev, projectGoals: textInputValue }));
    advanceToTextPrompt({
      promptMessage: "Got it. Is this a brand-new build, a redesign, or an expansion of something existing?",
      field: 'projectNature',
      placeholder: 'New build, redesign, or expansion',
      nextStage: 'project_nature'
    });
  };

  const processProjectNatureInput = () => {
    setClientInfo(prev => ({ ...prev, projectNature: textInputValue }));
    advanceToTextPrompt({
      promptMessage: "What timeline are you aiming for? (e.g., 4-6 weeks, Q3 launch)",
      field: 'timeline',
      placeholder: 'Desired timeline',
      nextStage: 'project_timeline'
    });
  };

  const processTimelineInput = () => {
    setClientInfo(prev => ({ ...prev, timeline: textInputValue }));
    advanceToTextPrompt({
      promptMessage: "Do you have a budget range in mind? This helps us recommend the right scope.",
      field: 'budget',
      placeholder: 'Budget range or flexible',
      nextStage: 'project_budget'
    });
  };

  const processBudgetInput = () => {
    setClientInfo(prev => ({ ...prev, budget: textInputValue }));
    advanceToTextPrompt({
      promptMessage: "Which country or countries do you operate in? We tailor recommendations accordingly.",
      field: 'country',
      placeholder: 'Primary country of operation',
      nextStage: 'country'
    });
  };

  const processCountryInput = () => {
    setClientInfo(prev => ({ ...prev, country: textInputValue }));
    advanceToTextPrompt({
      promptMessage: "Any design inspirations, references, or products you admire? Links are welcome.",
      field: 'inspirationLinks',
      placeholder: 'Links or style notes',
      nextStage: 'inspiration'
    });
  };

  const processInspirationInput = () => {
    setClientInfo(prev => {
      const updatedInfo = {
        ...prev,
        inspirationLinks: textInputValue
      };
      saveClientInfo(updatedInfo);
      return updatedInfo;
    });
    
    const promptMessage = "Thank you! Ready to book a 15-minute discovery call to finalize the plan?";
    setCurrentQuestion(promptMessage);
    
    setIsTyping(true);
    setTimeout(() => {
      setConversation(prev => [...prev, { 
        from: 'ai', 
        text: promptMessage
      }]);
      setIsTyping(false);
      setShowTextInput(false);
      setShowOptions(true);
      setCurrentStage('booking_prompt');
    }, 1200);
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

  // Add this method to save client info to backend or localStorage
  const saveClientInfo = (info = clientInfo) => {
    // This uses clientInfo state to save or process the collected information
    console.log('Client information collected:', info);
    
    // Here you would typically send this data to your backend
    // Example: axios.post('/api/lead', clientInfo);
    
    // For now, let's store it in localStorage as an example
    localStorage.setItem('latestClientInfo', JSON.stringify(info));
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
    }
  };

  // Current theme styling
  const ts = themeStyles[theme];

  const stageOrder: Stage[] = [
    'initial',
    'service_selection',
    'project_details',
    'user_info',
    'project_goals',
    'project_nature',
    'project_timeline',
    'project_budget',
    'country',
    'inspiration',
    'booking_prompt',
    'booking',
    'confirmed'
  ];

  const stageLabels: Record<Stage, string> = {
    initial: 'Choose a service',
    service_selection: 'Specify the service',
    project_details: 'Project discussion',
    user_info: 'Your details',
    project_goals: 'Project goals',
    project_nature: 'Project scope',
    project_timeline: 'Timeline',
    project_budget: 'Budget',
    country: 'Location',
    inspiration: 'Inspiration',
    booking_prompt: 'Book a call',
    booking: 'Select a slot',
    confirmed: 'Confirmation'
  };

  const currentStepIndex = Math.max(0, stageOrder.indexOf(currentStage));
  const totalSteps = stageOrder.length;
  const progressPercent = Math.min(100, Math.round((currentStepIndex / (totalSteps - 1)) * 100));
  const nextStepLabel = stageOrder[currentStepIndex + 1]
    ? stageLabels[stageOrder[currentStepIndex + 1]]
    : 'Complete';

  const summaryItems = [
    {
      label: 'Service',
      value: selectedService
        ? serviceCategories[selectedService as keyof typeof serviceCategories].label
        : 'Pending'
    },
    { label: 'Focus', value: selectedSubService ?? 'Pending' },
    { label: 'Goals', value: clientInfo.projectGoals || 'Pending' },
    { label: 'Scope', value: clientInfo.projectNature || 'Pending' },
    { label: 'Timeline', value: clientInfo.timeline || 'Pending' },
    { label: 'Budget', value: clientInfo.budget || 'Pending' },
    { label: 'Location', value: clientInfo.country || 'Pending' },
    { label: 'Inspiration', value: clientInfo.inspirationLinks ? 'Provided' : 'Pending' }
  ];

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

  // Handle text input submission
  const handleTextInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInputValue.trim()) return;
    
    // Add the user message to the conversation only once
    setConversation(prev => [...prev, { from: 'user', text: textInputValue }]);
    
    // Ensure text input is hidden to prevent double submissions
    setShowTextInput(false);
    
    // Process based on current text input field
    switch (textInputField) {
      case 'name':
      case 'email':
      case 'company':
        processUserInfo();
        break;
      case 'projectGoals':
        processProjectGoalsInput();
        break;
      case 'projectNature':
        processProjectNatureInput();
        break;
      case 'timeline':
        processTimelineInput();
        break;
      case 'budget':
        processBudgetInput();
        break;
      case 'country':
        processCountryInput();
        break;
      case 'inspirationLinks':
        processInspirationInput();
        break;
    }
  };

  return (
    <section className={`w-full min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 relative ${ts.bgGradient} overflow-hidden pt-24 pb-36 md:pb-20`}>
      {/* Add burning cursor style and mobile scrollbar styling */}
      <style jsx global>{`
        @keyframes cursor-flame {
          0% { caret-color: #ff5722; box-shadow: 0 0 5px rgba(255, 87, 34, 0.5) inset; }
          25% { caret-color: #ff9800; box-shadow: 0 0 8px rgba(255, 152, 0, 0.5) inset; }
          50% { caret-color: #ff5722; box-shadow: 0 0 5px rgba(255, 87, 34, 0.5) inset; }
          75% { caret-color: #ff9800; box-shadow: 0 0 8px rgba(255, 152, 0, 0.6) inset; }
          100% { caret-color: #ff5722; box-shadow: 0 0 5px rgba(255, 87, 34, 0.5) inset; }
        }
        
        .burning-cursor {
          caret-color: #ff5722;
          caret-shape: block;
          animation: cursor-flame 1.5s infinite;
          transition: all 0.3s ease;
        }
        
        .burning-cursor:focus {
          box-shadow: 0 0 0 2px rgba(255, 87, 34, 0.25);
          border-color: #ff5722 !important;
        }
        
        /* Mobile scrollbar styling */
        .mobile-options::-webkit-scrollbar {
          display: none;
        }
        
        .mobile-options.active {
          cursor: grabbing;
        }
      `}</style>
      
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-500/3 blur-[150px] z-0"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/3 blur-[150px] z-0"></div>
      
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full ${ts.panelBg} ${ts.panelBorder} border flex items-center justify-center transition-all duration-300 ${ts.shadow}`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
      
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col">
        {/* Hero headline - more subtle */}
        <div className="mb-6 md:mb-8 text-center">
          <div className={`mb-2 inline-block px-2.5 py-0.5 ${ts.headerTextBg} rounded-full ${ts.textSecondary} text-xs uppercase tracking-wider`}>Next-Gen Digital Solutions</div>
          <h1 className={`text-4xl md:text-6xl font-display font-bold ${ts.textPrimary} mb-2 tracking-tight`}>
            OMERU PRO
            <span className="inline-flex items-center justify-center ml-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs px-2 py-0.5 rounded align-top mt-4">
              v1.0
            </span>
          </h1>
          <div className={`${ts.textSecondary} uppercase tracking-widest text-xs font-light opacity-80`}>
            MULTIPURPOSE DIGITAL ECOSYSTEM
          </div>
        </div>
        
        {/* Main content area with fixed card heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {/* Left panel */}
          <div className={`${ts.panelBg} rounded-xl p-3 md:p-4 ${ts.panelBorder} border min-h-[320px] md:h-[460px] flex flex-col relative overflow-hidden shadow-lg ${ts.shadow}`}>
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 70%)' }}></div>
            
            <div className={`flex items-center justify-between mb-3 pb-2 border-b ${ts.panelBorder}`}>
              <div className="flex items-center">
                <div className={`w-1.5 h-1.5 ${ts.indicatorBg} rounded-full mr-2`}></div>
                <span className={`${ts.textSecondary} text-xs`}>ASSISTANT</span>
              </div>
              <div className="flex space-x-1">
                <div className={`w-1 h-1 ${ts.dotInactiveBg} rounded-full`}></div>
                <div className={`w-1 h-1 ${ts.dotInactiveBg} rounded-full`}></div>
                <div className={`w-1 h-1 ${ts.dotInactiveBg} rounded-full`}></div>
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className={`p-3 ${ts.headingBg} rounded-lg mb-4 ${ts.panelBorder} border shadow-md ${ts.shadow}`}>
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <span className="text-blue-400 text-xs font-medium">O</span>
                  </div>
                  <span className={`ml-2 ${ts.textPrimary} text-sm font-medium`}>omeru assistant</span>
                </div>
                <p className={`${ts.textSecondary} text-sm`}>How can I help with your digital ecosystem today?</p>
              </div>
              
              {/* Options - Desktop version only with overflow scrolling */}
              <div className="overflow-y-auto flex-grow pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                {currentStage === 'initial' && !isMobile && (
                  <div className="space-y-2">
                    {Object.keys(serviceCategories).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleOptionSelect(key)}
                        className={`w-full p-2 rounded-lg ${ts.inputBg} ${ts.inputBgHover} ${ts.inputBorderHover} ${ts.textSecondary} hover:${ts.textPrimary} text-sm text-left flex items-center transition-all duration-200 ease-out ${ts.inputBorder} border shadow-sm ${ts.shadow}`}
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mr-2.5 flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        {serviceCategories[key as keyof typeof serviceCategories].label}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Dynamic options for other stages - Desktop version only */}
                {currentStage !== 'initial' && showOptions && !isMobile && (
                  <div className="space-y-2">
                    {getOptions().map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOptionSelect(option.value)}
                        className={`w-full p-2 rounded-lg ${ts.inputBg} ${ts.inputBgHover} ${ts.inputBorderHover} ${ts.textSecondary} hover:${ts.textPrimary} text-sm text-left flex items-center transition-all duration-200 ease-out ${ts.inputBorder} border shadow-sm ${ts.shadow}`}
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mr-2.5 flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Action button or Text Input */}
              <div className="mt-3">
                {showTextInput ? (
                  <form onSubmit={handleTextInputSubmit} className="flex w-full">
                    <input
                      ref={textInputRef}
                      type={textInputField === 'email' ? 'email' : 'text'}
                      value={textInputValue}
                      onChange={(e) => setTextInputValue(e.target.value)}
                      placeholder={textInputPlaceholder}
                      className={`flex-1 px-4 py-2 rounded-l-lg border ${ts.inputBorder} ${ts.inputBg} ${ts.textPrimary} focus:outline-none text-sm burning-cursor`}
                      autoFocus
                    />
                    <button 
                      type="submit"
                      className={`px-4 py-2 rounded-r-lg bg-gradient-to-r ${ts.buttonGradient} ${ts.buttonHoverGradient} text-white text-sm font-medium shadow-md shadow-blue-900/10 ${ts.buttonBorder} border`}
                    >
                      Send
                    </button>
                  </form>
                ) : (
                  <button 
                    className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r ${ts.buttonGradient} ${ts.buttonHoverGradient} text-white text-sm font-medium transition-all duration-200 shadow-md shadow-blue-900/10 ${ts.buttonBorder} border`}
                    onClick={() => {
                      if (!aiReady) {
                        setAiReady(true);
                      }
                      
                      // Always start conversation when button is clicked, regardless of aiReady state
                      // Reset conversation
                      setConversation([]);
                      setSelectedService(null);
                      setSelectedSubService(null);
                      setClientInfo({
                        name: '',
                        email: '',
                        company: '',
                        country: '',
                        projectGoals: '',
                        projectNature: '',
                        timeline: '',
                        budget: '',
                        inspirationLinks: ''
                      });
                      setCurrentStage('initial');
                      startConversation();
                    }}
                  >
                    {conversation.length === 0 ? "Start Project Planner" : "Restart Planner"}
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Middle panel - chat interaction with fixed height */}
          <div className={`${ts.panelBg} rounded-xl p-3 md:p-4 ${ts.panelBorder} border min-h-[400px] md:h-[460px] flex flex-col relative overflow-hidden shadow-lg ${ts.shadow}`}>
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 70%)' }}></div>
            
            <div className={`flex items-center justify-between mb-3 pb-2 border-b ${ts.panelBorder}`}>
              <div className="flex items-center">
                <div className={`w-1.5 h-1.5 ${ts.indicatorBg} rounded-full mr-2`}></div>
                <span className={`${ts.textSecondary} text-xs`}>CONVERSATION</span>
              </div>
              <div className="flex space-x-1">
                <div className={`w-1 h-1 ${ts.dotInactiveBg} rounded-full`}></div>
                <div className={`w-1 h-1 ${ts.dotInactiveBg} rounded-full`}></div>
                <div className={`w-1 h-1 ${ts.dotInactiveBg} rounded-full`}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-xs">
                <span className={`${ts.textSecondary}`}>Step {currentStepIndex + 1} of {totalSteps}</span>
                <span className={`${ts.textTertiary}`}>Next: {nextStepLabel}</span>
              </div>
              <div className={`mt-2 h-1.5 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                <div
                  className={`h-full bg-gradient-to-r ${ts.timelineFill}`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
            
            {/* Adjusted conversation container to handle scrollbar better */}
            <div className="relative z-10 flex-1 overflow-hidden">
              <div 
                className="h-full overflow-y-auto pr-3 pb-2" 
                style={{ 
                  scrollbarWidth: 'thin', 
                  scrollbarColor: 'rgba(255,255,255,0.1) transparent',
                  marginRight: '-8px', // Compensate for scrollbar width
                  paddingRight: '8px'   // Add padding to avoid content being cut off
                }}
              >
                {/* Conversation history */}
                <div className="space-y-2.5 pr-1">
                  {conversation.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] p-2.5 rounded-lg ${
                          message.from === 'user' 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm shadow-blue-900/10' 
                            : `${ts.messageBg} ${ts.messageBorder} border ${ts.textPrimary} shadow-sm ${ts.shadow}`
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator moved here to show in conversation */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-start"
                    >
                      <div className={`py-2 px-3 rounded-lg ${ts.messageBg} ${ts.messageBorder} border ${ts.textPrimary} shadow-sm ${ts.shadow}`}>
                        <div className="flex space-x-1.5">
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
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Welcome message when empty */}
                {conversation.length === 0 && !isTyping && (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-xs mx-auto">
                      <motion.div
                        className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/10 flex items-center justify-center mb-5 ${ts.panelBorder} border`}
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 flex items-center justify-center">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} strokeWidth="1.5"/>
                            <path d="M8 12H16" stroke={theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M12 8V16" stroke={theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </motion.div>
                      <h3 className={`${ts.textPrimary} text-sm font-medium mb-2`}>
                        Welcome to Omeru Digital Assistant
                      </h3>
                      <p className={`${ts.textSecondary} text-xs mb-4`}>
                        Click &ldquo;Start Project Planner&ldquo; to begin. We&lsquo;ll guide you through scoping, timeline, and budget so you can quickly reach booking.
                      </p>
                      <div className={`px-3 py-2 rounded-md ${ts.inputBg} ${ts.panelBorder} border inline-block`}>
                        <p className={`${ts.textSecondary} text-xs`}>
                          You can answer at your own pace
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* End of messages reference point */}
                <div ref={chatEndRef} className="h-2" />
              </div>
            </div>
          </div>
          
          {/* Right panel - visualization with fixed height */}
          <div className={`${ts.panelBg} rounded-xl p-3 md:p-4 ${ts.panelBorder} border min-h-[400px] md:h-[460px] flex flex-col relative overflow-hidden shadow-lg ${ts.shadow}`}>
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 70%)' }}></div>
            
            <div className={`flex items-center justify-between mb-3 pb-2 border-b ${ts.panelBorder}`}>
              <div className="flex items-center">
                <div className={`w-1.5 h-1.5 ${ts.indicatorBg} rounded-full mr-2`}></div>
                <span className={`${ts.textSecondary} text-xs`}>SERVICE DETAILS</span>
              </div>
              <div className="flex space-x-1">
                <div className={`w-1 h-1 ${ts.dotInactiveBg} rounded-full`}></div>
                <div className={`w-1 h-1 ${ts.dotInactiveBg} rounded-full`}></div>
                <div className={`w-1 h-1 ${ts.dotInactiveBg} rounded-full`}></div>
              </div>
            </div>
            
            <div className="relative z-10 h-full flex flex-col overflow-y-auto">
              <div className={`p-3 ${ts.headingBg} rounded-lg mb-4 ${ts.panelBorder} border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${ts.textPrimary} text-sm font-medium`}>Project brief</p>
                    <p className={`${ts.textSecondary} text-xs`}>Captured requirements</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${ts.inputBg} ${ts.panelBorder} border`}>
                    {progressPercent}% complete
                  </span>
                </div>
                <div className={`mt-3 h-1.5 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div
                    className={`h-full bg-gradient-to-r ${ts.timelineFill}`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                {summaryItems.map((item) => (
                  <div key={item.label} className={`p-2.5 rounded-lg ${ts.inputBg} ${ts.panelBorder} border`}>
                    <p className={`${ts.textTertiary} text-[11px] uppercase tracking-wide`}>{item.label}</p>
                    <p className={`${ts.textPrimary} text-xs mt-1 break-words`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className={`mt-4 p-3 rounded-lg ${ts.timelineBg} ${ts.panelBorder} border`}>
                <p className={`${ts.textSecondary} text-xs`}>Next step</p>
                <p className={`${ts.textPrimary} text-sm font-medium mt-1`}>{nextStepLabel}</p>
                <p className={`${ts.textTertiary} text-xs mt-2`}>
                  Keep answering to build a scoped plan and reach scheduling.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Service categories - Desktop - at bottom */}
        <div className="mt-4 mb-4 hidden md:flex justify-center md:items-center flex-wrap md:flex-nowrap gap-2 md:gap-0 md:space-x-6">
          {Object.keys(serviceCategories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`text-xs px-2.5 py-1 rounded-md transition-all duration-200 ${
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
      {isMobile && (showOptions || showTextInput) && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full pb-[env(safe-area-inset-bottom)]">
          {/* Current question display */}
          <div className={`${ts.panelBg} p-2 ${ts.panelBorder} border-t border-x w-full ${ts.textPrimary} text-center font-medium text-xs shadow-md ${ts.shadow}`}>
            {currentQuestion}
          </div>
          
          {/* Scrollable options or text input based on state */}
          {showTextInput ? (
            <div className={`${ts.panelBg} p-3 ${ts.panelBorder} border-t border-x border-b`}>
              <form onSubmit={handleTextInputSubmit} className="flex w-full">
                <input
                  ref={textInputRef}
                  type={textInputField === 'email' ? 'email' : 'text'}
                  value={textInputValue}
                  onChange={(e) => setTextInputValue(e.target.value)}
                  placeholder={textInputPlaceholder}
                  className={`flex-1 px-4 py-2 rounded-l-md border ${ts.inputBorder} ${ts.inputBg} ${ts.textPrimary} focus:outline-none burning-cursor`}
                  autoFocus
                />
                <button 
                  type="submit"
                  className={`px-4 py-2 rounded-r-md bg-gradient-to-r ${ts.buttonGradient} ${ts.buttonHoverGradient} text-white font-medium`}
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Scrollable options */}
              <div 
                ref={optionsScrollRef}
                className={`${ts.panelBg} p-2 ${ts.panelBorder} border-t border-x border-b overflow-x-auto flex space-x-2 pb-3 pt-1.5 px-3 whitespace-nowrap mobile-options`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', touchAction: 'pan-x' }}
              >
                {getOptions().map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className={`flex-shrink-0 px-2.5 py-2 rounded-lg ${ts.inputBg} ${ts.inputBgHover} ${ts.inputBorderHover} ${ts.textSecondary} hover:${ts.textPrimary} text-xs text-center min-w-[130px] transition-all duration-200 ease-out ${ts.inputBorder} border shadow-sm ${ts.shadow}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {/* Optional: Add small indicator dots to show swipeable content */}
              <div className="flex justify-center mt-1 pb-0.5">
                <div className="flex space-x-0.5">
                  {getOptions().length > 0 && getOptions().slice(0, Math.min(5, getOptions().length)).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-0.5 h-0.5 rounded-full ${i === 0 ? ts.dotActiveBg : ts.dotInactiveBg}`}
                    ></div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Hero;
