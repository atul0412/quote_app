import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../GraphQL/mutation';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState(false);
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser({
        variables: {
          userNew: formData
        }
      });
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  useEffect(() => {
    if (data) {
      setSuccess(true);
      setFormData({ name: "", email: "", password: "" });
      const timer = setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);

  return (
    <div className='container my-container'>
      {loading && <h2>Loading...</h2>}

      {error && (
        <div className='red card-panel'>
          {error.graphQLErrors?.[0]?.message || "User already exists"}
        </div>
      )}

      {success && (
        <div className='green card-panel'>
          Signup successful! Redirecting to login...
        </div>
      )}

      <h5>Signup!!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Link to="/login"><p>Already have an account?</p></Link>
        <button className='btn #673ab7 deep-purple' type='submit'>Signup</button>
      </form>
    </div>
  );
}
