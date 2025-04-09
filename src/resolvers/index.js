const userResolvers = require('./user_resolvers');
const publicationResolvers = require('./publication_resolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...publicationResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...publicationResolvers.Mutation,
  },
  User: {
    ...userResolvers.User,
  },
  Publication: {
    ...publicationResolvers.Publication,
  },
};

module.exports = resolvers;