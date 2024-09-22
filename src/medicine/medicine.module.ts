import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Health } from '../health/entities/health.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SequelizeModule.forFeature([Health]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
  exports: [MedicineService],
})
export class MedicineModule {}
