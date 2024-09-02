import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Repository } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { SignUpUserRequestDto } from './dto/signup-user-request.dto';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async save(reqDto: SignUpUserRequestDto) {
    const existUser = await this.findByUsername(reqDto.username);
    if (existUser) throw new ConflictException('User already exists');

    reqDto.password = await bcrypt.hash(reqDto.password, 10);

    return this.userRepository.create(reqDto);
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }
}
