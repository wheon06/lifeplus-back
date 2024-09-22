import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Medicine } from './entities/medicine.entity';
import { Repository } from 'sequelize-typescript';
import { SaveMedicineRequestDto } from './dto/save-medicine-request.dto';

@Injectable()
export class MedicineService {
  constructor(
    @InjectModel(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) {}

  async save(reqDto: SaveMedicineRequestDto) {
    return await this.medicineRepository.create(reqDto);
  }

  async findByDate(userId: number, date: string): Promise<Medicine> {
    return await this.medicineRepository.findOne({
      where: { userId: userId, date: date },
    });
  }
}
