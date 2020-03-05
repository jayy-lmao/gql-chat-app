import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';
import { withFilter } from 'apollo-server-express';
import messageResolver from './message-resolver';
import communityResolver from './community-resolver';
import userResolver from './user-resolver';
import queryResolver from './query-resolver';
import clanResolver from './clan-resolver';
import mutationResolver from './mutation-resolver';
import { NEW_MESSAGE } from './constants';

const options = {
  host: 'redis',
  port: 6379,
};

const pubSub = new RedisPubSub({ publisher: new Redis(options), subscriber: new Redis(options) });

const resolvers = {
  Message: messageResolver,
  Clan: clanResolver,
  Community: communityResolver,
  User: userResolver,
  Query: queryResolver,
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(NEW_MESSAGE),
        (payload, variables) => payload.newMessage.clanId === variables.clanId,
      ),
    },
  },
  Mutation: mutationResolver,
};

export default resolvers;
