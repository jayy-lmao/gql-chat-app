import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import resolvers from './resolvers';
import schema from './schema';
import 'reflect-metadata';
import User from './entities/User';
import Community from './entities/Community';
import Clan from './entities/Clan';
import Message from './entities/Message';

createConnection({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'jayylmao',
  password: 'yeetus',
  database: 'chatapp',
  entities: [User, Community, Clan, Message],
  synchronize: true,
  logging: false,
}).then(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: { User, Community, Clan, Message },
  });

  server.listen().then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at ${url}`);
  });
});
