import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Server ready at ${url}`);
});
