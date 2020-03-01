export default {
  users: (_parent, _args, { User }) => User.find(),
  messages: (_parent, _args, { Message }) => Message.find(),
  communities: (_parent, _args, { Community }) => Community.find(),
  clans: (_parent, _args, { Clan }) => Clan.find(),
};
