import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table
export class Health extends Model<Health> {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiProperty()
  @Column({ allowNull: true })
  heartRate: number;

  @ApiProperty()
  @Column({ allowNull: true })
  temperature: number;

  @ApiProperty()
  @Column({ allowNull: true })
  oxygenSaturation: number;

  @ApiProperty()
  @Column({ allowNull: true })
  stress: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

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
