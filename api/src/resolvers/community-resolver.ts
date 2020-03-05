export default {
  owner: (parent, _args, { data: { User } }) => User.findOne(parent.ownerId),
};
