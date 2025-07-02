const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    quote(by: ID!): [Quote]
    myProfile:User
  }

  type QuoteWithName {
    _id: ID!
    text: String
    author: IDName
     comments: [Comment!]!

  }

  type IDName {
    _id: String
    name: String
  }

  type User {
    _id: ID!
    name: String
    email: String
    password: String
    quotes: [Quote]
  }

  type Quote {
    _id: ID!
    text: String
    author: ID!
    comments: [Comment]
  }
  type Comment {
    _id: ID!
    text: String!
    author: User!
    quote: Quote!
    createdAt: String!
  } 

  type Token {
    token: String!
  }

  type Mutation {
    signupUser(UserNew: UserInput!): User
    loginUser(userLogin: userLoginInput!): Token
    createQuote(text: String!): String
    createComment(input: CommentInput!): Comment!
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
  }
  input userLoginInput {
    email: String!
    password: String!
  }
  input CommentInput {
  text: String!
  quoteId: ID!
  }
`;

module.exports = typeDefs;
