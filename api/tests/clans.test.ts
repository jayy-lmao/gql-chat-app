import { gql } from 'apollo-boost';
import { client} from './utils/client';

const GET_COMMUNITIES = gql`
query getCommunities{
  communities {
    id
    name
    description
    __typename
  }
}
`

describe('Query', ()=> {
  it('Can get communities', async()=>{
    const res = await client.query({
      query: GET_COMMUNITIES
    });

    console.log(res);

    expect(res.data).toEqual({
      communities: []
    });
  });
});
