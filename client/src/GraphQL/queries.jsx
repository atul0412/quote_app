import { gql } from '@apollo/client';

export const GET_ALL_QUOTES = gql`
   query Query {
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