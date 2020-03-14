import { gql } from 'apollo-boost';
export const MESSAGE_SUBSCRIPTION = gql`
subscription messageSub($clanName: String!){
  newMessage(clanName: $clanName) {
    id
    text
    author {
      username
    }
  }
}
`;
