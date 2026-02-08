'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPaperPlane, 
  faCheck 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      
      // Reset form after success message
      setTimeout(() => {
        setFormData({ 
          name: '', 
          email: '', 
          company: '', 
          projectType: '', 
          message: '' 
        });
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };
  
  // Consultation options with emojis for icons
  const consultationOptions = [
    { value: 'app_development', label: 'App Development', icon: '💻' },
    { value: 'automation', label: 'Business Automation', icon: '⚙️' },
    { value: 'integration', label: 'System Integration', icon: '🔄' },
    { value: 'full_ecosystem', label: 'Full Ecosystem Design', icon: '🔌' },
    { value: 'not_sure', label: 'Not sure yet', icon: '❓' }
  ];
  
  return (
    <section id="contact" className="w-full py-24 md:py-32 px-6 md:px-12 relative bg-[#111111]">
      {/* Section header */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-20">
          <div className="h-px w-12 bg-white/20 mr-4"></div>
          <span className="text-white/60 text-sm uppercase tracking-wider">Get in Touch</span>
          <div className="h-px w-12 bg-white/20 ml-4"></div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Book a Consultation
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Ready to transform your business with modular digital solutions? Let&apos;s discuss how we can help you streamline operations and enhance customer experiences.
          </p>
          <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm">
            <span>Prefer a guided project plan first? Start with the assistant above.</span>
            <a
              href="/#"
              className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-all"
            >
              Start Planning
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left side - Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5">
              <h3 className="text-white font-medium mb-6">Why Book a Consultation</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-400 text-xs">01</span>
                  </div>
                  <span className="text-white/70">Get expert assessment of your digital needs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-400 text-xs">02</span>
                  </div>
                  <span className="text-white/70">Explore custom solutions for your business challenges</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-400 text-xs">03</span>
                  </div>
                  <span className="text-white/70">Discover how modular systems scale with your growth</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-400 text-xs">04</span>
                  </div>
                  <span className="text-white/70">Receive a tailored implementation roadmap</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5">
              <h3 className="text-white font-medium mb-6">Direct Connections</h3>
              
              <div className="space-y-4">
                <motion.a
                  href="mailto:contact@omeru.digital"
                  className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faEnvelope} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">Email</div>
                    <div className="text-white/60 text-xs">contact@omeru.digital</div>
                  </div>
                </motion.a>
                
                <motion.a
                  href="https://wa.me/yourwhatsappnumber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">WhatsApp</div>
                    <div className="text-white/60 text-xs">Direct Message</div>
                  </div>
                </motion.a>
              </div>
              
              {/* Social links */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="text-white/60 text-xs mb-4">Connect on Social</div>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
                    whileHover={{ y: -2 }}
                  >
                    <FontAwesomeIcon icon={faTwitter} className="text-sm" />
                  </motion.a>
                  <motion.a
                    href="#"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
                    whileHover={{ y: -2 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-[#1A1A1A] rounded-xl p-6 md:p-8 border border-white/5">
              <h3 className="text-white font-medium mb-6">Book Your Strategy Session</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-white/60 text-sm mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 text-white transition-all"
                      required
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white/60 text-sm mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 text-white transition-all"
                      required
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                      placeholder="johndoe@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <label htmlFor="company" className="block text-white/60 text-sm mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 text-white transition-all"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    placeholder="Your Company LLC"
                  />
                </div>
                
                <div className="mb-5">
                  <label htmlFor="projectType" className="block text-white/60 text-sm mb-2">
                    What are you interested in?
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 text-white transition-all appearance-none"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    required
                  >
                    <option value="" disabled className="bg-[#1A1A1A]">Select a service...</option>
                    {consultationOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#1A1A1A]">
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className="block text-white/60 text-sm mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 text-white transition-all resize-none"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    placeholder="Tell us about your project and goals..."
                  ></textarea>
                </div>

                <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <h4 className="text-white text-sm font-medium mb-2">What happens next</h4>
                  <ul className="text-white/70 text-xs space-y-2">
                    <li>• We review your brief and align it with the best-fit service.</li>
                    <li>• You receive a tailored scope and recommended timeline.</li>
                    <li>• We confirm your discovery call and next steps.</li>
                  </ul>
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all ${
                    formStatus === 'success' 
                      ? 'bg-green-500/80 hover:bg-green-500'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {formStatus === 'idle' && (
                    <span className="flex items-center justify-center">
                      Submit Request
                      <FontAwesomeIcon icon={faPaperPlane} className="ml-2 text-sm" />
                    </span>
                  )}
                  {formStatus === 'submitting' && (
                    <span className="flex items-center justify-center">
                      Processing
                      <motion.div 
                        className="ml-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        ⟳
                      </motion.div>
                    </span>
                  )}
                  {formStatus === 'success' && (
                    <span className="flex items-center justify-center">
                      Request Received
                      <FontAwesomeIcon icon={faCheck} className="ml-2 text-sm" />
                    </span>
                  )}
                </button>
                
                {formStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm"
                  >
                    Thank you for your inquiry! Our team will review your request and get back to you within 24 hours to schedule your consultation.
                  </motion.div>
                )}
                
                <div className="mt-4 text-white/40 text-xs flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                  <span>Your information is encrypted and secure</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
