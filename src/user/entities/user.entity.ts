import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Health } from 'src/health/entities/health.entity';

@Table({ paranoid: true })
export class User extends Model<User> {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiProperty()
  @Column({ allowNull: false })
  username: string;

  @ApiProperty()
  @Column({ allowNull: false })
  password: string;

  @HasMany(() => Health)
  healthList: Health[];

  @ApiProperty()
  @Column({ allowNull: false })
  createdAt: Date;

  @ApiProperty()
  @Column({ allowNull: false })
  updatedAt: Date;

  @ApiProperty()
  @Column({ allowNull: true })
  deletedAt: Date;
}
