import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from "next/router"
import { GET_COMMUNITY_CLANS } from './get-community-clans';
import Link from 'next/link';


const CommunityPage = () => {
  const router = useRouter();
  const { communityName } = router.query;
  const { loading, error, data } = useQuery(GET_COMMUNITY_CLANS, { variables: { communityName } });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const clans = data?.communityByName?.clans || [];

  return (
    <section>
      <h2>{communityName}'s Clans</h2>
      <ul>
        {clans.map(clan =>
          <li key={clan.id}>
            <Link
              href="/communities/[communityName]/[clanName]"
              as={`/communities/${communityName}/${clan.name}`}
            >
              {clan.name}
            </Link>
          </li>
        )}
      </ul>
    </section >
  )
}

CommunityPage.getInitialProps = async () => {
  return {};
};

export default CommunityPage;
