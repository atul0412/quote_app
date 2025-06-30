import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CREATE_QUOTES } from '../GraphQL/mutation'
import { GET_ALL_QUOTES, GET_MY_PROFILE } from '../GraphQL/queries'

export default function CreateQuote() {
  const [quote, setQuote] = useState("")
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTES, {
    refetchQueries: [
      { query: GET_ALL_QUOTES },
      { query: GET_MY_PROFILE }
    ],
    awaitRefetchQueries: true,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createQuote({
      variables: {
        text: quote
      }
    })
  }

  useEffect(() => {
    if (data) {
      setSuccess(true)
      setQuote("")
      // Hide the success message after 3 seconds
      const timer = setTimeout(() => {
        setSuccess(false)
        navigate("/")
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [data, navigate])

  return (
    <div>
      <div className='container my-container'>
        {error && (
          <div className='red card-panel'>
            {error.graphQLErrors?.[0]?.message || "User not logged in"}
          </div>
        )}
        {success && (
          <div className='green card-panel'>
            Quote created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={quote}
            onChange={e => setQuote(e.target.value)}
            placeholder='Write your quote here'
          />
          <button className='btn green' disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  )
}
