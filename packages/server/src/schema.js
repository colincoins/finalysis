const {gql} = require('apollo-server');

const typeDefs = gql`
type Query {
  user(email: String!): User
}

type Mutation {
  register(email: String!, password: String!): [Error]
}

type User {
  id: ID! @unique
  name: String
  email: String!
  password: String!
}

type Error {
  field: String!
  message: String!
}
`;

module.exports = typeDefs;
