import { gql } from '@apollo/client';

export const GET_ALL_QUOTES = gql`
   query getAllQuotes {
        quotes {
            text
            author {
                _id
                name
            }  
        }
    }`;

export const GET_QUOTE_BY_ID = gql`
    query GetQuoteById($id: ID!) {
        quote(id: $id) {
            id
            text
            author
        }
    }
`;

export const GET_MY_PROFILE = gql`
    query getMyProfile{
        user:myProfile{
            name
            email
            quotes{
                text
            }
       }
} 
`