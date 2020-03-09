module.exports = {
  client: {
    service: {
      name: "gql-chat-app",
      url: "http://localhost:4000/graphql"
    },
    includes: ["./pages/**/*.{js,jsx,graphql}"]
  }
};
