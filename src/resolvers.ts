import { find, filter } from 'lodash';
import { users } from './users';
import communities from './communities';
import { Community, Clan } from './@types';
import clans from './clans';

import members from './members';

// Should be able to mutate in memory just like this
users.push({ id: 3, name: 'Mickey' });

const resolvers = {
  Community: {
    // parent, args, context, info
    clans: (parent: Community) => filter(clans, { communityId: parent.id }),
    owner: (parent: Community) => find(users, { id: parent.owner }),
  },
  Clan: {
    members: (parent: Clan) =>
      filter(members, { communityId: parent.id }).map(member => find(users, { id: member.userId })),
  },
  Query: {
    users: () => users,
    communities: () => communities,
  },
};

export default resolvers;
