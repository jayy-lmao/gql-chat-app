import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const options = {
  host: 'redis',
  port: 6379,
};

const pubSub = new RedisPubSub({ publisher: new Redis(options), subscriber: new Redis(options) });

const NEW_MESSAGE = 'NEW_MESSAGE';

const resolvers = {
  Message: {
    author: (parent, _args, { User }) => {
      console.log(parent.authorId);
      return User.findOne(parent.authorId);
    },
  },
  User: {
    messages: (parent, _args, { Message }) => Message.find({ author: parent.id }),
  },
  Query: {
    users: (_parent, _args, { User }) => User.find(),
    messages: (_parent, _args, { Message }) => Message.find(),
    communities: (_parent, _args, { Community }) => Community.find(),
    clans: (_parent, _args, { Clan }) => Clan.find(),
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubSub.asyncIterator([NEW_MESSAGE]),
    },
  },
  Mutation: {
    createUser: (_parent, args, { User }) => {
      const user = new User();
      user.name = args.name;
      return user.save();
    },
    createMessage: (_parent, args, { Message }) => {
      const message = new Message();
      console.log({ args });
      message.text = args.text;
      message.authorId = args.authorId;
      message.clanId = args.clanId;
      return message.save();
    },
  },
};

export default resolvers;
