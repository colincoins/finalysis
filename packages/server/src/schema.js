const {gql} = require('apollo-server');

const typeDefs = gql`
type Query {
  user(id: ID!): User
}

type User {
  id: ID! @unique
  name: String!
}
`;

module.exports = typeDefs;
