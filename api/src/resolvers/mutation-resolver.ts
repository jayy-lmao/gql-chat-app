import { hash, compare } from 'bcrypt';
import { NEW_MESSAGE } from './constants';

const SALT_ROUNDS = 10;

export default {
  signup: async (_parent, { username, password }, { data: { User } }) => {
    const user = new User();
    const hashedPass = await hash(password, SALT_ROUNDS);
    user.username = username;
    user.password = hashedPass;
    return user.save();
  },
  login: async (_parent, { username, password }, { req, data: { User } }) => {
    const candidate = await User.findOne({ username });
    const result = await compare(password, candidate.password);
    req.session.userId = candidate.id;
    return result && candidate.id;
  },
  logout: (_parent, _args, { req }) => req.session.destroy() && true,
  clan: (_parent, { name, description, communityId }, { req, data: { Clan } }) =>
    Clan.create({
      name,
      description,
      communityId,
      hostId: req.session.userId,
    }).save(),
  community: (_parent, { name, description }, { req, data: { Community } }) =>
    Community.create({
      name,
      description,
      ownerId: req.session.userId,
    }).save(),
  message: (_parent, args, { req, pubSub, data: { Message } }) => {
    const message = new Message();
    message.text = args.text;
    message.authorId = req.session.userId;
    message.clanId = args.clanId;
    pubSub.publish(NEW_MESSAGE, { newMessage: message });
    return message.save();
  },
};
