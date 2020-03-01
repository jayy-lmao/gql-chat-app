import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Community {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  name: string;
}

export default Community;
