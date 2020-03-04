import { hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export default {
  createUser: async (_parent, { username, password }, { User }) => {
    const user = new User();
    const hashedPass = await hash(password, SALT_ROUNDS);
    user.username = username;
    user.password = hashedPass;
    return user.save();
  },
  createMessage: (_parent, args, { Message }) => {
    const message = new Message();
    message.text = args.text;
    message.authorId = args.authorId;
    message.clanId = args.clanId;
    return message.save();
  },
};
