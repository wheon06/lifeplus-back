import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { Medicine } from './entities/medicine.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Medicine]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
  exports: [MedicineService],
})
export class MedicineModule {}
