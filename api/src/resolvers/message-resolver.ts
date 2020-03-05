export default {
  author: (parent, _args, { data: { User } }) => User.findOne(parent.authorId),
  clan: (parent, _args, { data: { Clan } }) => Clan.findOne(parent.clanId),
};
