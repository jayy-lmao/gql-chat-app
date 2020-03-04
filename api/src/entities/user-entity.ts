import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column()
  username: string;

  @Column()
  password: string;
}

export default User;
