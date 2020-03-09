import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_COMMUNITIES = gql`
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
`

export default function Communities() {
  const { loading, error, data } = useQuery(GET_COMMUNITIES);
  if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  console.log(data?.communities)

  return (
    <ul>
      {data?.communities.map(community => <li key={community.id}>
        <b>{community.name}</b>
        <p>{community.description}</p>
        - <i>{community.owner.username}</i>
      </li>)}
    </ul>
  )
}
