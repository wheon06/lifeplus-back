import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Health } from './entities/health.entity';
import { Repository } from 'sequelize-typescript';
import { SaveHealthRequestDto } from './dto/save-health-request.dto';

@Injectable()
export class HealthService {
  constructor(
    @InjectModel(Health) private readonly healthRepository: Repository<Health>,
  ) {}

  async save(reqDto: SaveHealthRequestDto) {
    return await this.healthRepository.create(reqDto);
  }

  async findByOrderByCreatedAtDesc(userId: number) {
    return await this.healthRepository.findOne({
      where: { userId: userId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findHealthHistory(userId: number) {
    return await this.healthRepository.findAll({
      where: { userId: userId },
      order: [['createdAt', 'ASC']],
      limit: 8,
    });
  }
}
