export default {
  author: (parent, _args, { User }) => User.findOne(parent.authorId),
};
