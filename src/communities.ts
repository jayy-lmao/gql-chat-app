export interface Community {
  id: number;
  name: String;
  description: String;
  owner: number;
}

export const communities: Community[] = [
  {
    id: 1,
    name: "Daddy's Dungeons",
    description: "Dungeons and dragons chat",
    owner: 1,
  },
  {
    id: 2,
    name: "Yeetus",
    description: "The finest meetus",
    owner: 2,
  },
];
