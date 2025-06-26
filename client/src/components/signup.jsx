import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../GraphQL/mutation';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  if(loading) return<h2>Loading</h2>

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

  return (
    <div className='container my-container'>
      {/* Show clean error message */}
      {error && (
        <div className='red card-panel'>
          {error.graphQLErrors?.[0]?.message || "user already exist"}
        </div>
      )}

      {/* Show success message */}
      {data && data.signupUser && (
        <div className='green card-panel'>
          {data.signupUser.name} is signed up. You can login now.
        </div>
      )}

      <h5>Signup!!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <Link to="/login"><p>Already have an account?</p></Link>
        <button className='btn #673ab7 deep-purple' type='submit'>Signup</button>
      </form>
    </div>
  );
}
