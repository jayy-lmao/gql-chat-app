import gql from 'graphql-tag';
export const GET_CLAN_MESSAGES = gql`
query getMessageByClanName($clanName: String!){
  clanByName(name:$clanName){
    id
    messages{
      id
      text
      author{
        username
      }
    }
  }
}
`