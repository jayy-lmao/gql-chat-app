import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import messageResolver from './message-resolver';
import userResolver from './user-resolver';
import queryResolver from './query-resolver';
import mutationResolver from './mutation-resolver';

const options = {
  host: 'redis',
  port: 6379,
};

const pubSub = new RedisPubSub({ publisher: new Redis(options), subscriber: new Redis(options) });

const NEW_MESSAGE = 'NEW_MESSAGE';

const resolvers = {
  Message: messageResolver,
  User: userResolver,
  Query: queryResolver,
  Subscription: {
    newMessage: {
      subscribe: () => pubSub.asyncIterator([NEW_MESSAGE]),
    },
  },
  Mutation: mutationResolver,
};

export default resolvers;
