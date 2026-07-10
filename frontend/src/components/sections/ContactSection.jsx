import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import api from '../../lib/axios';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [settings, setSettings] = useState(null);

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        if (data.success) {
          setSettings(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch settings', error);
      }
    };
    fetchSettings();
  }, []);

  const email = settings?.contact_email || 'hello@devportfolio.com';
  const github = settings?.contact_github || '#';
  const linkedin = settings?.contact_linkedin || '#';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await api.post('/messages', formData);
      setStatus('success');
      setToastMsg('Message sent successfully! I will get back to you soon.');
      setShowToast(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setToastMsg(err.response?.data?.message || 'Failed to send message. Please try again.');
      setShowToast(true);
    } finally {
      if (status !== 'success' && status !== 'error') {
         setTimeout(() => setStatus('idle'), 3000);
      }
    }
  };

  return (
    <>
      <section className="page-header" id="contact">
        <div className="page-header-inner">
          <span className="eyebrow">Connect</span>
          <h1><TextGenerateEffect words="Get in Touch" /></h1>
          <p>I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-grid">
          
          {/* Contact Info */}
          <motion.div 
            className="info-card"
            whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(99,102,241,0.2)' }}
            transition={{ duration: 0.2 }}
          >
            <h3>Contact Information</h3>
            <p className="lead">Feel free to reach out through any of these platforms.</p>
            
            <div className="info-list">
              <a href={`mailto:${email}`} className="info-link">
                <Mail size={18} />
                <span>{email}</span>
              </a>
              <div className="info-link" style={{ cursor: 'default' }}>
                <MapPin size={18} />
                <span>Jakarta, Indonesia (Remote)</span>
              </div>
              <a href={github} target="_blank" rel="noopener noreferrer" className="info-link">
                <Github size={18} />
                <span>GitHub Profile</span>
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="info-link">
                <Linkedin size={18} />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-card"
            whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(99,102,241,0.2)' }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={status === 'loading'}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  disabled={status === 'loading'}
                />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  disabled={status === 'loading'}
                ></textarea>
              </div>
              <div className="submit-row">
                <motion.button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </motion.button>
              </div>
            </form>
          </motion.div>
          
        </div>
      </section>

      <div className="toast-wrap">
        <div className={`toast ${status === 'success' ? 'success' : 'error'} ${showToast ? 'show' : ''}`}>
          {status === 'success' ? (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          )}
          <span>{toastMsg}</span>
          <button onClick={() => setShowToast(false)} style={{ marginLeft: 'auto', padding: '4px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactSection;
