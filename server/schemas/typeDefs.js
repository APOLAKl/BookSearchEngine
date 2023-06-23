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

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }


  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login (username: String, email: String, password: String!): Auth
    saveBook(bookToSave: BookInput ): User
    deleteBook(bookId: String!): User
  }





`

module.exports = typeDefs;