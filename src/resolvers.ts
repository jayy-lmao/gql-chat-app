import { users } from "./users";
import { communities } from "./communities";
import { clans } from "./clans";
import { members } from "./members";
const { find, filter } = require("lodash");

// Should be able to mutate in memory just like this
users.push({ id: 3, name: "Mickey" });

export const resolvers = {
  Community: {
    clans: (parent, args, context, info) => filter(clans, { communityId: parent.id }),
    owner: (parent, args, context, info) => find(users, { id: parent.owner }),
  },
  Clan: {
    members: (parent) =>
      filter(members, { communityId: parent.id }).map((member) => find(users, { id: member.userId })),
  },
  Query: {
    users: (parent, args, context, info) => users,
    communities: () => communities,
  },
};
