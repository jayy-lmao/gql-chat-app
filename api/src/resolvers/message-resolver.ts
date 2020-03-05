export default {
  author: (parent, _args, { data: { User } }) => User.findOne(parent.authorId),
};
