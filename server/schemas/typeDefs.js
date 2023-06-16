const {gql} = require("apollo-server-express");

const typeDefs = gql`

type Book {
  authors: [String]
  description: String
  bookId: String
  image: String
  link: String
  title: String
}

  type User {
    username: String
    email: String
    password: String
    saveBooks: [Book]
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
  }


  type Mutation {
    createUser: Auth
    login: Auth
  }



`

module.exports = typeDefs;