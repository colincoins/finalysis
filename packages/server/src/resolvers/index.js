const {userQuery} = require('./Query/user');

module.exports = {
  Query: {
    ...userQuery,
  },
};
