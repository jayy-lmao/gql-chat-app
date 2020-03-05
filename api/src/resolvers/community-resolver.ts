export default {
  owner: (parent, _args, { data: { User } }) => User.findOne(parent.ownerId),
  clans: (parent, _args, { data: { Clan } }) => Clan.find({ communityId: parent.id }),
};
