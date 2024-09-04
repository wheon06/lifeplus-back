import { SaveUserDetailRequestDto } from './dto/save-user-detail-request.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDetail } from './entities/user-detail.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class UserDetailService {
  constructor(
    @InjectModel(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
  ) {}

  async save(reqDto: SaveUserDetailRequestDto) {
    return await this.userDetailRepository.create(reqDto);
  }

  async findById(id: number) {
    return await this.userDetailRepository.findOne({ where: { id: id } });
  }
}
