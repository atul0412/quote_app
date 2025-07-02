import { gql } from '@apollo/client';
export const GET_ALL_QUOTES = gql`
  query GetAllQuotes {
    quotes {
      _id
      text
      author {
        _id
        name
      }
      comments {
        _id
        text
        author {
          name
        }
      }
    }
  }
`;

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
export const GET_SINGLE_QUOTE = gql`
  query GetSingleQuote($id: ID!) {
    quote(id: $id) {
      _id
      text
      author {
        name
      }
      comments {
        _id
        text
        author {
          name
        }
        createdAt
      }
    }
  }
`
