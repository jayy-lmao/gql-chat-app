export default {
  createUser: (_parent, args, { User }) => {
    const user = new User();
    user.name = args.name;
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
