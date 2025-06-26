import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_QUOTES } from '../GraphQL/queries'

export default function Home() {
   const {loading, error, data } = useQuery(GET_ALL_QUOTES)
   if (loading) return <h1>Loading..</h1>
   if (error){
        console.log(error.message)
   }
   if (data.quotes.length === 0){
    return <h3>No quotes here...!!!!</h3>
   }

  return (
    <div className='container'>
      {
        data.quotes.map(quote=>{
          return (
            <blockquote>
            <h6>{quote.text} </h6>
            <p className='right-aline'>~{quote.author.name}</p>
            </blockquote>
          )
        })
      }
    </div>
  )
}
