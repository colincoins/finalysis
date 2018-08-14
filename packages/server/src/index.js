require('dotenv').config();
const {ApolloServer} = require('apollo-server');
const {Prisma} = require('prisma-binding');
const {applyMiddleware} = require('graphql-middleware');
const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

async function startServer() {
  const logInputMiddleware = async (resolve, root, args, context, info) => {
    console.log(`1 -> logInputMiddleware - Input arguments:  ${JSON.stringify(args)}`);
    const result = await resolve(root, args, context, info);
    console.log(`5 -> logInputMiddleware`);
    return result;
  };

  const logResultMiddleware = async (resolve, root, args, context, info) => {
    console.log(`2 -> logResultMiddleware`);
    const result = await resolve(root, args, context, info);
    console.log(`4 -> logResultMiddleware - Result:  ${JSON.stringify(result)}`);
    return result;
  };

  const schema = makeExecutableSchema({typeDefs, resolvers});
  const schemaWithMiddleware = applyMiddleware(schema, logInputMiddleware, logResultMiddleware);
  const server = new ApolloServer({
    cors: false,
    // typeDefs,
    // resolvers,
    schema: schemaWithMiddleware,
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
};

// startServer();
module.exports = {startServer};
