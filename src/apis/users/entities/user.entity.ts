import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  nickname: string;

  @Column()
  address: string;

  @Column()
  name: string;

  @Column()
  agreement_use: boolean;

  @Column()
  agreement_mkt: boolean;

  @Column()
  favorites: string;
}
