import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Repository } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { SignUpUserRequestDto } from './dto/signup-user-request.dto';
import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async save(reqDto: SignUpUserRequestDto) {
    this.checkExistUser(reqDto.username);

    reqDto.password = await bcrypt.hash(reqDto.password, 10);

    return this.userRepository.create(reqDto);
  }

  async checkExistUser(username: string) {
    const existUser = await this.findByUsername(username);
    if (existUser) throw new ConflictException('User already exists');
    return HttpStatus.OK;
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }
}
