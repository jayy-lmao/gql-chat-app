import { gql } from 'apollo-server';

const typeDefs = gql`
  type Community {
    clans: [Clan]
    description: String
    id: Int!
    name: String
    owner: User
  }

  type Clan {
    description: String
    id: Int!
    members: [User]
    name: String
    community: Community
    messages: [Message]
  }

  type Message {
    id: Int
    text: String
    clan: Clan
    author: User
  }

  type User {
    id: String!
    name: String
    messages: [Message]
  }

  type Query {
    users: [User]
    communities: [Community]
    messages: [Message]
    clans: [Clan]
  }

  type Mutation {
    createUser(name: String): User
    createMessage(text: String, clanId: Int, authorId: String): Message
  }

  type Subscription {
    newMessage: Message
  }
`;

export default typeDefs;
