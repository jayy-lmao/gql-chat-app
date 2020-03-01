import User from './user-entity';
import Community from './community-entity';
import Clan from './clan-entity';
import Message from './message-entity';

export const entitiesContext = { User, Community, Clan, Message };
export const entities = Object.keys(entitiesContext).map(e => entitiesContext[e]);
