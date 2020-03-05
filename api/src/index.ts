import { ApolloServer, gql } from 'apollo-server-express';
import { createServer } from 'http';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as session from 'express-session';
import * as Redis from 'ioredis';

import * as express from 'express';
import * as fs from 'fs';
import { createConnection } from 'typeorm';
import resolvers from './resolvers';
import 'reflect-metadata';
import { entitiesContext, entities } from './entities';

const RedisStore = require('connect-redis')(session);

const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8'));

const options = {
  host: 'redis',
  port: 6379,
};

const pubSub = new RedisPubSub({ publisher: new Redis(options), subscriber: new Redis(options) });

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
    tracing: true,
    resolvers,
    context: ({ res, req }) => ({ req, res, pubSub, data: entitiesContext }),
  });

  app.use(
    session({
      secret: 'afasgasd',
      resave: false,
      store: new RedisStore({ client: new Redis({ host: 'redis', port: 6379 }) }),
      saveUninitialized: false,
    }),
  );

  server.applyMiddleware({
    app,
  });
  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port: 4000 }, () => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at 4000`);
  });
};

startServer();
