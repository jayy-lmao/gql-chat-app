import { useQuery } from '@apollo/react-hooks';
import { useRouter } from "next/dist/client/router"
import { GET_COMMUNITY_CLANS } from '../../queries/get-community-clans';
export default function Community() {
  const router = useRouter();
  if (!router?.query) { return <div>Loading...</div> };
  const { communityName } = router.query;
  const { loading, error, data } = useQuery(GET_COMMUNITY_CLANS, { variables: { communityName } });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <section>
      <h2>{communityName}'s Clans</h2>
      <ul>
        {data?.communityByName?.clans.map(clan => <li key={clan.id}>
          <b>{clan.name}</b>
          <p>{clan.description}</p>
          - <i>{clan.host.username}</i>
        </li>)}
      </ul>
    </section>
  )
}
