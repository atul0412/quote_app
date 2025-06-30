// src/components/Profile.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_PROFILE } from '../GraphQL/queries';

export default function Profile() {
  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
  fetchPolicy: "network-only", // Always refetch from server
});


  if (loading) return <h3>Profile is loading...</h3>;
  if (error) {
    console.error(error);
    return <h3>Error loading profile.</h3>;
  }

  if (!data || !data.user) {
    return <h3>No user data found.</h3>;
  }

  const { name, email, quotes } = data.user;

  return (
    <div className='container my-container'>
      <div className='center-align'>
        <img
          className='circle'
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`http://robohash.org/${name}.png`}
          alt="User Avatar"
        />
        <h5>{name}</h5>
        <h5>Email: {email}</h5>
      </div>

      <h3>Your Quotes</h3>
      {quotes.length === 0 ? (
        <h5>No quotes found.</h5>
      ) : (
        quotes.map((quo, idx) => (
          <blockquote key={idx}>
            <h6>{quo.text}</h6>
          </blockquote>
        ))
      )}
    </div>
  );
}
