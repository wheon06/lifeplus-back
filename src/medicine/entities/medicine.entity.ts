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
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiProperty()
  @Column({ allowNull: true })
  breakfast: string;

  @ApiProperty()
  @Column({ allowNull: true })
  checkedBreakfast: boolean;

  @ApiProperty()
  @Column({ allowNull: true })
  lunch: string;

  @ApiProperty()
  @Column({ allowNull: true })
  checkedLunch: boolean;

  @ApiProperty()
  @Column({ allowNull: true })
  dinner: string;

  @ApiProperty()
  @Column({ allowNull: true })
  checkedDinner: boolean;

  @ApiProperty()
  @Column({ allowNull: false })
  date: string;

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
}
