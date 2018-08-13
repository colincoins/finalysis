require('dotenv').config();
const {ApolloServer} = require('apollo-server');
const {Prisma} = require('prisma-binding');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const server = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
  context: (req) => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_URL,
    }),
  }),
});

server.listen({port: process.env.PORT}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});

