export default {
  messages: (parent, _args, { Message }) => Message.find({ author: parent.id }),
};
