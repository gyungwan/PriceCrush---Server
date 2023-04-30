import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '유저 고유 아이디' })
  id: string;

  @Column()
  @ApiProperty({ description: '유저 이메일' })
  email: string;

  @Column()
  @ApiProperty({ description: '유저 비밀번호' })
  password: string;

  @Column()
  @ApiProperty({ description: '유저 전화번호' })
  phone: string;

  @Column()
  @ApiProperty({ description: '유저 닉네임' })
  nickname: string;

  @Column()
  @ApiProperty({ description: '유저 주소' })
  address: string;

  @Column()
  @ApiProperty({ description: '유저 이름' })
  name: string;

  @Column()
  @ApiProperty({ description: '서비스 이용 약관 동의 여부' })
  agreement_use: boolean;

  @Column()
  @ApiProperty({ description: '마케팅 수신 동의 여부' })
  agreement_mkt: boolean;

  @Column()
  @ApiProperty({ description: '유저 관심사' })
  favorites: string;
}
