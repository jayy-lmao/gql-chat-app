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
    id: Int!
    name: String
  }

  type Query {
    users: [User]
    communities: [Community]
  }

  type Mutation {
    createUser(name: String): User
    createMessage(text: String, clanId: Int, authorId: Int): Message
  }

  type Subscription {
    newMessage: Message
  }
`;

export default typeDefs;
