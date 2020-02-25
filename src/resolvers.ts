import { find, filter } from 'lodash';
import { users } from './users';
import communities from './communities';
import { Community, Clan, Message } from './@types';
import clans from './clans';
import messages from './messages';

import members from './members';

const { PubSub } = require('apollo-server');

const pubsub = new PubSub();
const NEW_MESSAGE = 'NEW_MESSAGE';

// Should be able to mutate in memory just like this
users.push({ id: 3, name: 'Mickey' });

const resolvers = {
  Message: {
    author: (parent: Message) => find(users, { id: parent.authorId }),
    clan: (parent: Message) => find(clans, { id: parent.clanId }),
  },
  Community: {
    // parent, args, context, info
    clans: (parent: Community) => filter(clans, { communityId: parent.id }),
    owner: (parent: Community) => find(users, { id: parent.owner }),
  },
  Clan: {
    community: (parent: Clan) => find(clans, { communityId: parent.id }),
    members: (parent: Clan) =>
      filter(members, { communityId: parent.id }).map(member => find(users, { id: member.userId })),
    messages: (parent: Clan) => filter(messages, { clanId: parent.id }),
  },
  Query: {
    users: () => users,
    communities: () => communities,
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([NEW_MESSAGE]),
    },
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = { name: args.name, id: users.length };
      users.push(newUser);
      return newUser;
    },
    createMessage: (_, args) => {
      const newMessage = { authorId: args.authorId, text: args.text, clanId: args.clanId, id: messages.length };
      messages.push(newMessage);
      pubsub.publish(NEW_MESSAGE, { newMessage });
      return newMessage;
    },
  },
};

export default resolvers;
