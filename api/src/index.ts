import { ApolloServer, gql } from 'apollo-server';
import * as fs from 'fs';
import { createConnection } from 'typeorm';
import resolvers from './resolvers';
import 'reflect-metadata';
import { entitiesContext, entities } from './entities';

const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8'));

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
    typeDefs,
    resolvers,
    context: { ...entitiesContext },
  });

  server.listen().then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at ${url}`);
  });
});
