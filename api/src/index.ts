import { ApolloServer, gql } from 'apollo-server-express';
import * as session from 'express-session';
import * as express from 'express';
import * as fs from 'fs';
import { createConnection } from 'typeorm';
import resolvers from './resolvers';
import 'reflect-metadata';
import { entitiesContext, entities } from './entities';

const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8'));

const startServer = async () => {
  await createConnection({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'jayylmao',
    password: 'yeetus',
    database: 'chatapp',
    entities,
    synchronize: true,
    logging: false,
  });

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ res, req }) => ({ req, res, data: entitiesContext }),
  });

  app.use(
    session({
      secret: 'afasgasd',
      resave: false,
      saveUninitialized: false,
    }),
  );

  server.applyMiddleware({
    app,
  });

  app.listen({ port: 4000 }, () => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at 4000`);
  });
};

startServer();
