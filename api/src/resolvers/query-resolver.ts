export default {
  users: (_parent, _args, { data: { User } }) => User.find(),
  me: (_parent, _args, { req, data: { User } }) => User.findOne({ id: req.session.userId }),
  messages: (_parent, _args, { data: { Message } }) => Message.find(),
  communities: (_parent, _args, { data: { Community } }) => Community.find(),
  clans: (_parent, _args, { Clan }) => Clan.find(),
};
