import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_QUOTES } from '../GraphQL/queries'
import CommentForm from './commentFrom'

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_QUOTES)
  if (loading) return <h1>Loading..</h1>
  if (error) {
    return <h3>Error: {error.message}</h3>
  }
  if (data.quotes.length === 0) {
    return <h3>No quotes here...!!!!</h3>
  }

  return (
    <div className='container'>
      {
        data.quotes.map(quote => {
          return (
            <blockquote key={quote._id}>
              <h6>{quote.text}</h6>
              <p className='right-align'>~{quote.author.name}</p>

              <div style={{ marginLeft: '1rem' }}>
                <h6>Comments:</h6>
                {
                  quote.comments?.length > 0 ? (
                    quote.comments.map((comment) => (
                      <p key={comment._id}>
                        <strong>{comment.author.name}:</strong> {comment.text}
                      </p>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )
                }

                <CommentForm quoteId={quote._id} refetchQuotes={refetch} />
              </div>
            </blockquote>
          )
        })
      }
    </div>
  )
}
