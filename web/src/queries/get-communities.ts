import gql from 'graphql-tag';
export const GET_COMMUNITIES = gql`
  query {
  communities{
    name
    description
    id
    owner{
    username
      id
    }
  }
}
`;
