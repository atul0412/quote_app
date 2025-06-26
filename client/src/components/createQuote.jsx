import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_QUOTES } from '../GraphQL/mutation'

export default function CreateQuote() {
  const [quote, setQuote] = useState("")
  const [createQuote,{loading,error,data}] = useMutation(CREATE_QUOTES)
  const handleSubmit = (e) => {
    e.preventDefault()
    createQuote({
      variables:{
        text: quote
      }
    })
  }
  if(loading) return<h2>loading</h2>
  if(data){
    console.log(data)
  }

  if(error){
    console.log(error.message)
  }
  return (
    <div>
      <div className=' container my-container'>
         {error && (
        <div className='red card-panel'>
          {error.graphQLErrors?.[0]?.message || "user not logedin"}
        </div>
      )}

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={quote}
            onChange={e => setQuote(e.target.value)}
            placeholder='Write your quote here'
          />
          <button className='btn green'>add</button>
        </form>
      </div>
    </div>
  )
}
