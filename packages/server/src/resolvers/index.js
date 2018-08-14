const {userQuery} = require('./Query/user');
const {userResolver} = require('./Mutation/user/register/resolvers');

module.exports = {
  Query: {
    ...userQuery,
  },
  Mutation: {
    ...userResolver,
  },
};
