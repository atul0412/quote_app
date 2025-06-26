import { gql } from '@apollo/client'

export const SIGNUP_USER = gql`
mutation signupUser($userNew: UserInput!){
  signupUser(UserNew: $userNew) {
    name
  }
}`

export const LOGIN_USER = gql`
mutation($userLogin: userLoginInput!){
  loginUser(userLogin: $userLogin) {
    token
  }
}
`
export const CREATE_QUOTES = gql`
mutation($text: String!){
  createQuote(text: $text)
}
`