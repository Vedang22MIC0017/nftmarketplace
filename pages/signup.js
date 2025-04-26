import React, { useState } from 'react';
import styles from '../styles/auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // TODO: Implement registration logic here
      console.log('Sign up attempt:', formData);
      router.push('/signin'); // Redirect to sign in page after successful registration
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_card}>
        <h1>Create Account</h1>
        <p>Join the NFT marketplace community</p>
        
        <form onSubmit={handleSubmit} className={styles.auth_form}>
          {error && <div className={styles.error_message}>{error}</div>}
          
          <div className={styles.form_group}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              minLength="8"
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className={styles.auth_button}>
            Create Account
          </button>
        </form>

        <div className={styles.auth_footer}>
          <p>Already have an account? <Link href="/signin">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;