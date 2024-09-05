import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table
export class UserDetail extends Model<UserDetail> {
  @ApiProperty()
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  id: number;

  @ApiProperty()
  @Column({ allowNull: false })
  name: string;

  @ApiProperty()
  @Column({ allowNull: false })
  birthday: Date;

  @ApiProperty()
  @Column({ allowNull: false })
  height: string;

  @ApiProperty()
  @Column({ allowNull: false })
  weight: string;

  @ApiProperty()
  @Column({ allowNull: false })
  email: string;

  @ApiProperty()
  @Column({ allowNull: false })
  mobile: string;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty()
  @Column({ allowNull: false })
  createdAt: Date;

  @ApiProperty()
  @Column({ allowNull: false })
  updatedAt: Date;
}
