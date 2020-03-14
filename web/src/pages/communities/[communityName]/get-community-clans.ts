import gql from 'graphql-tag';
export const GET_COMMUNITY_CLANS = gql`
query GetCommunityByName($communityName: String!){
  communityByName(name: $communityName){
    name
    id
    owner{
    username
      id
    }
    clans {
      id
      name
      description
      host {
        username
      }
    }
  }
}
`;
