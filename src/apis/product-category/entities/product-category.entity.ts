import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// products와 1:1 관계 설정 필요
@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '아이디' })
  id: string;

  @Column({ default: '' })
  @ApiProperty({ description: '카테고리명' })
  name: string;
}
