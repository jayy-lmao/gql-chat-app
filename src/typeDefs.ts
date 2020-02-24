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
  }

  type User {
    id: Int!
    name: String
  }

  type Query {
    users: [User]
    communities: [Community]
  }
`;

export default typeDefs;
