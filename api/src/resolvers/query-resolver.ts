import { compare } from 'bcrypt';

export default {
  users: (_parent, _args, { data: { User } }) => User.find(),
  me: (_parent, _args, { req, data: { User } }) => User.findOne({ id: req.session.userId }),
  messages: (_parent, _args, { data: { Message } }) => Message.find(),
  communities: (_parent, _args, { data: { Community } }) => Community.find(),
  clans: (_parent, _args, { Clan }) => Clan.find(),
  login: async (_parent, { username, password }, { req, data: { User } }) => {
    const candidate = await User.findOne({ username });
    const result = await compare(password, candidate.password);
    req.session.userId = candidate.id;
    return result && candidate.id;
  },
};
