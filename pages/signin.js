import React, { useState } from 'react';
import styles from '../styles/auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    try {
      // TODO: Implement authentication logic here
      console.log('Sign in attempt:', formData);
      router.push('/'); // Redirect to home page after successful sign in
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_card}>
        <h1>Welcome Back</h1>
        <p>Sign in to access your NFT marketplace account</p>
        
        <form onSubmit={handleSubmit} className={styles.auth_form}>
          {error && <div className={styles.error_message}>{error}</div>}
          
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
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className={styles.auth_button}>
            Sign In
          </button>
        </form>

        <div className={styles.auth_footer}>
          <p>Don't have an account? <Link href="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;