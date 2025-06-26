import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { LOGIN_USER } from '../GraphQL/mutation'

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  
  const [loginUser, { error, loading }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      if (data?.loginUser?.token) {
        localStorage.setItem("token", data.loginUser.token);
        navigate("/");
      } else {
        console.warn("Login failed: no token returned");
      }
    },
    onError(err) {
      console.error("Login error:", err.message);
    }
  });

  if (loading) return <h1>Loading...</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        userLogin: formData
      }
    });
  };

  return (
    <div className='container my-container'>
      {error && <div className='red card-panel'>{error.graphQLErrors?.[0]?.message || error.message}</div>}

      <h5>Login!!!</h5>
      <form onSubmit={handleSubmit}>
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
        <Link to="/signup"><p>Don't have an account?</p></Link>
        <button className='btn #673ab7 deep-purple' type='submit'>Login</button>
      </form>
    </div>
  );
}
