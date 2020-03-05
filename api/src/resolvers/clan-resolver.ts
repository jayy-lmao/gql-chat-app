export default {
  host: (parent, _args, { data: { User } }) => User.findOne(parent.ownerId),
  community: (parent, _args, { data: { Community } }) => Community.findOne(parent.communityId),
  messages: (parent, _args, { data: { Message } }) => Message.find({ clanId: parent.id }),
};
