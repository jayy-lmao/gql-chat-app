import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default User;
