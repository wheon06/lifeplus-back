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
import { Medicine } from '../../medicine/entities/medicine.entity';

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

  @HasMany(() => Medicine)
  medicineList: Medicine[];

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
