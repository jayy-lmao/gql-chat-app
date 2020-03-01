import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import resolvers from './resolvers';
import schema from './schema';
import 'reflect-metadata';
import { entitiesContext, entities } from './entities';

createConnection({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'jayylmao',
  password: 'yeetus',
  database: 'chatapp',
  entities,
  synchronize: true,
  logging: false,
}).then(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: { ...entitiesContext },
  });

  server.listen().then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at ${url}`);
  });
});
