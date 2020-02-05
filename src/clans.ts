
export interface Clan {
  id: number;
  name: String;
  description: String,
  communityId: number
};

export const clans: Clan[] = [
  {
    id: 1,
    name: "Character building",
    description: "Coming up with characters",
    communityId: 1,
  },
  {
    id: 2,
    name: "Damage Control",
    description: "Deciding how to deal damage",
    communityId: 1,
  },
  {
    id: 3,
    name: "Hamo's Hams",
    description: "Hamish's Fine Selection of Hams",
    communityId: 2,
  },
];
