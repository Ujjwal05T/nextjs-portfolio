"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { FaPaperPlane, FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      
      // Reset status after a delay
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }
  };

  // Social links data
  const socialLinks = [
    {
      name: "Email",
      icon: <FaEnvelope size={20} />,
      href: "mailto:your.email@example.com",
      color: "from-yellow-500 to-red-500",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      href: "https://linkedin.com/in/yourusername",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "GitHub",
      icon: <FaGithub size={20} />,
      href: "https://github.com/yourusername",
      color: "from-zinc-400 to-zinc-700",
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={20} />,
      href: "https://twitter.com/yourusername",
      color: "from-sky-400 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background sparkles */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="contactsparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Get In Touch
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Have a question or want to work together? Feel free to reach out.
          </p>
          <div className="h-1 w-16 sm:w-20 bg-zinc-700 mx-auto mt-3 sm:mt-4" />
        </motion.div>
        
        {/* Social Links Badges */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank" 
              rel="noopener noreferrer"
              className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${link.color} shadow-lg hover:shadow-xl transition-all duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={link.name}
              title={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-5 sm:p-6 lg:w-2/3 hover:border-zinc-700 transition-colors duration-300"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Send Me a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-zinc-800/80 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-200 hover:border-zinc-600 transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-zinc-800/80 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-200 hover:border-zinc-600 transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-zinc-800/80 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-200 resize-none hover:border-zinc-600 transition-colors duration-200"
                  placeholder="Your message..."
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full flex items-center justify-center px-5 py-3 sm:py-4 rounded-md text-white transition-all duration-200 ${
                  isSubmitting 
                    ? "bg-zinc-700 cursor-not-allowed" 
                    : "bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 shadow-md hover:shadow-lg"
                }`}
              >
                <FaPaperPlane className={`mr-2 ${isSubmitting ? 'animate-pulse' : ''}`} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
              
              {/* Status messages */}
              {submitStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-900/40 border border-green-800 text-green-300 rounded-md text-sm"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Your message has been sent successfully! I&apos;ll get back to you soon.
                  </div>
                </motion.div>
              )}
              
              {submitStatus === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-900/40 border border-red-800 text-red-300 rounded-md text-sm"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    There was an error sending your message. Please try again later.
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
          
          {/* Response time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-5 sm:p-6 lg:w-1/3 hover:border-zinc-700 transition-colors duration-300"
          >
            <div className="flex flex-col h-full justify-center">
              <div className="mb-6 flex items-center">
                <div className="mr-4 p-3 rounded-full bg-zinc-800 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Response Time</h3>
              </div>
              
              <p className="text-zinc-400 text-sm leading-relaxed">
                I typically respond within 24-48 hours. For urgent matters, please indicate in your message.
              </p>
              
              {/* <div className="mt-8 pt-6 border-t border-zinc-800">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full mr-3 border-2 border-zinc-700">
                    <img 
                      src="/profile-photo.jpg" 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/100?text=Profile";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Your Name</h4>
                    <p className="text-zinc-500 text-xs">Web Developer</p>
                  </div>
                </div>
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}