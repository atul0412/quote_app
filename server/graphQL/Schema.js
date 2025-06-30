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
    text: String
    author: IdName
  }

  type IdName {
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
    text: String
    author: ID!
  }

  type Token {
    token: String!
  }

  type Mutation {
    signupUser(UserNew: UserInput!): User
    loginUser(userLogin: userLoginInput!): Token
    createQuote(text: String!): String
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
`;

module.exports = typeDefs;
