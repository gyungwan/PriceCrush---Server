import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '인증 고유 아이디' })
  id: string;

  @Column()
  @ApiProperty({ description: '인증 핸드폰 번호' })
  phone: string;

  @Column()
  @ApiProperty({ description: '인증 코드' })
  code: string;

  @CreateDateColumn()
  @ApiProperty({ description: '인증 생성 일짜' })
  created_at: Date;
}
