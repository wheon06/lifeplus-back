import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Medicine extends Model<Medicine> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: true })
  breakfast: string;

  @Column({ allowNull: true })
  lunch: string;

  @Column({ allowNull: true })
  dinner: string;

  @Column({ allowNull: false })
  date: string;

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
}
