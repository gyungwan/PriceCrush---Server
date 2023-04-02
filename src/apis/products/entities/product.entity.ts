import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  start_price: number;

  @Column()
  desc: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
