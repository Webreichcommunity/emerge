import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiPhone, FiMail, FiUser, FiMessageSquare } from 'react-icons/fi';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(120, 113, 108, 0.5)",
      borderColor: "#a8a29e"
    }
  };

  const buttonVariants = {
    initial: { 
      background: "linear-gradient(135deg, #57534e 0%, #292524 100%)",
      scale: 1
    },
    hover: {
      background: "linear-gradient(135deg, #44403c 0%, #1c1917 100%)",
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    },
    submitting: {
      background: "linear-gradient(135deg, #44403c 0%, #1c1917 100%)",
      scale: 0.98
    }
  };

  const successVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h1 
            variants={cardVariants}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-stone-300 via-stone-400 to-stone-500 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            variants={cardVariants}
            className="text-lg text-stone-400"
          >
            We're here to help and answer any questions you might have.
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={cardVariants}
          className="bg-stone-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-stone-700/50"
        >
          {submitSuccess ? (
            <motion.div
              variants={successVariants}
              initial="hidden"
              animate="visible"
              className="text-center py-8"
            >
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-stone-800 mb-4">
                <svg
                  className="h-6 w-6 text-stone-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-stone-100 mb-2">
                Message Sent!
              </h3>
              <p className="text-stone-400">
                We've received your message and will get back to you soon.
              </p>
              <motion.button
                onClick={() => setSubmitSuccess(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 px-4 py-2 bg-stone-700 text-stone-200 rounded-md text-sm font-medium hover:bg-stone-600 transition-colors"
              >
                Send Another Message
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              <motion.div variants={cardVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-stone-800/70 border border-stone-700 rounded-lg focus:outline-none text-stone-100 placeholder-stone-500 transition-all duration-200"
                  placeholder="Your Name"
                  required
                  whileFocus={inputVariants.focus}
                />
              </motion.div>

              <motion.div variants={cardVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-stone-800/70 border border-stone-700 rounded-lg focus:outline-none text-stone-100 placeholder-stone-500 transition-all duration-200"
                  placeholder="Email Address"
                  required
                  whileFocus={inputVariants.focus}
                />
              </motion.div>

              <motion.div variants={cardVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-stone-800/70 border border-stone-700 rounded-lg focus:outline-none text-stone-100 placeholder-stone-500 transition-all duration-200"
                  placeholder="Phone Number (Optional)"
                  whileFocus={inputVariants.focus}
                />
              </motion.div>

              <motion.div variants={cardVariants} className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <FiMessageSquare className="h-5 w-5 text-stone-400" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-stone-800/70 border border-stone-700 rounded-lg focus:outline-none text-stone-100 placeholder-stone-500 transition-all duration-200"
                  placeholder="Your message..."
                  required
                  whileFocus={inputVariants.focus}
                ></textarea>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover={isSubmitting ? "submitting" : "hover"}
                  whileTap="tap"
                  animate={isSubmitting ? "submitting" : "initial"}
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 text-stone-100 font-medium rounded-lg flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          variants={cardVariants}
          className="mt-12 text-center"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-lg font-medium text-stone-300 mb-3">Or reach us directly</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-stone-400">
              <div className="flex items-center justify-center space-x-2">
                <FiMail className="h-5 w-5 text-stone-400" />
                <span>hello@example.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <FiPhone className="h-5 w-5 text-stone-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-lg font-medium text-stone-300 mb-4">Follow us</h3>
            <div className="inline-flex space-x-5">
              {[
                { name: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
                { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
              ].map((social) => (
                <motion.a 
                  key={social.name}
                  href="#"
                  whileHover={{ y: -3, color: "#a8a29e" }}
                  whileTap={{ scale: 0.95 }}
                  className="text-stone-500 hover:text-stone-300 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;