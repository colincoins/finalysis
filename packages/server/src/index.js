const { ApolloServer } = require('apollo-server');
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers');
const typeDefs = require('./schema')

const server = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466'
    })
  })
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

