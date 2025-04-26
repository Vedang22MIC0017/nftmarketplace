import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/contact.module.css';
import { Title } from '../components/componentIndex';
import { FaTwitter, FaFacebook, FaTelegram, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const socialLinks = [
    { name: 'Twitter', icon: <FaTwitter size={24} />, url: '#' },
    { name: 'Facebook', icon: <FaFacebook size={24} />, url: '#' },
    { name: 'Telegram', icon: <FaTelegram size={24} />, url: '#' },
    { name: 'YouTube', icon: <FaYoutube size={24} />, url: '#' }
  ];

  return (
    <div className={styles.contact}>
      <div className={styles.contact_container}>
        <Title
          heading="Contact Us"
          paragraph="Get in touch with our team for any inquiries or support"
        />

        <div className={styles.contact_content}>
          <div className={styles.contact_form_container}>
            <form className={styles.contact_form} onSubmit={handleSubmit}>
              <div className={styles.form_group}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className={styles.form_group}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className={styles.form_group}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                />
              </div>
              <div className={styles.form_group}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`${styles.submit_button} ${status === 'sending' ? styles.sending : ''}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <div className={styles.success_message}>
                  Thank you for your message. We'll get back to you soon!
                </div>
              )}
            </form>
          </div>

          <div className={styles.contact_info}>
            <div className={styles.info_card}>
              <h3>Visit Us</h3>
              <p>123 Blockchain Street</p>
              <p>Crypto City, CC 12345</p>
            </div>

            <div className={styles.info_card}>
              <h3>Contact Info</h3>
              <p>Email: support@nftmarketplace.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>

            <div className={styles.social_links}>
              <h3>Follow Us</h3>
              <div className={styles.social_icons}>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.social_icon}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;