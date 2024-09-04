import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
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
  @Column({ allowNull: true, type: DataType.FLOAT })
  heartRate: number;

  @ApiProperty()
  @Column({ allowNull: true, type: DataType.FLOAT })
  temperature: number;

  @ApiProperty()
  @Column({ allowNull: true, type: DataType.FLOAT })
  oxygenSaturation: number;

  @ApiProperty()
  @Column({ allowNull: true, type: DataType.FLOAT })
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
