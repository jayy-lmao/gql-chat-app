import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMMUNITIES } from './get-communities';

function Communities() {
  const { loading, error, data } = useQuery(GET_COMMUNITIES);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return <section>
    <h2>Communities</h2>
    {data?.communities?.map(
      community => (
        <Link href={"/communities/[communityName]"} as={`/communities/${community.name}`} key={community.id}>
          <div>
            <b>{community.name}</b>
            <p>{community.description}</p>
            - <i>{community.owner.username}</i>
          </div>
        </Link>
      )
    )}
  </section>
}

Communities.getInitialProps = async () => ({});

export default Communities;