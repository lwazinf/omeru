'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebook, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <section id="contact" className="w-full py-16 px-6 md:px-12 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
          Contact Us
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00452E] focus:outline-none"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00452E] focus:outline-none"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00452E] focus:outline-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-[#00452E] text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center justify-center w-full"
              >
                Send Message
                <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
              </button>
            </form>
          </div>
          
          {/* Social Media and Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Connect with us</h3>
            <p className="text-gray-700 mb-6">
              Have questions about our AI solutions? Reach out to us through any of these channels:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="mailto:contact@omeru.digital"
                className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-white transition-all"
              >
                <div className="w-12 h-12 bg-[#00452E] text-white rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-gray-700 text-sm">contact@omeru.digital</p>
                </div>
              </a>
              
              <a
                href="https://wa.me/yourwhatsappnumber"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-white transition-all"
              >
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                </div>
                <div>
                  <h4 className="font-bold">WhatsApp</h4>
                  <p className="text-gray-700 text-sm">Chat with us directly</p>
                </div>
              </a>
              
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-white transition-all"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </div>
                <div>
                  <h4 className="font-bold">Facebook</h4>
                  <p className="text-gray-700 text-sm">Follow our updates</p>
                </div>
              </a>
              
              <a
                href="https://tiktok.com/@youraccount"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-white transition-all"
              >
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faTiktok} size="lg" />
                </div>
                <div>
                  <h4 className="font-bold">TikTok</h4>
                  <p className="text-gray-700 text-sm">Check our latest videos</p>
                </div>
              </a>
              
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-white transition-all"
              >
                <div className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </div>
                <div>
                  <h4 className="font-bold">Twitter</h4>
                  <p className="text-gray-700 text-sm">Stay updated</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 