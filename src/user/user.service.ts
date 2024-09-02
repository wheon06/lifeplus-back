import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Repository } from 'sequelize-typescript';
import { SaveUserRequestDto } from './dto/save-user-request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async save(reqDto: SaveUserRequestDto) {
    const existUser = await this.findByUsername(reqDto.username);

    if (existUser) {
      throw new ConflictException('Username already exists');
    }

    reqDto.password = await this.encryptPassword(reqDto.password);

    return this.userRepository.create(reqDto);
  }

  private async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }

  private async encryptPassword(password: string): Promise<string> {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
  }
}
