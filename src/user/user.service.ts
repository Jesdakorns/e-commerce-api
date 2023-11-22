import { AuthService } from './../auth/auth.service';
// import { User } from 'src/schema/user.schema';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterFormDto } from 'src/auth/dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Connection, EntityManager, Repository, getManager } from 'typeorm';
import {
  InjectConnection,
  InjectEntityManager,
  InjectRepository,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { Passwords, Users } from './entities';
import { ResponseModel, ResponseModelProps } from 'src/response/response-model';

@Injectable()
export class UserService {
  constructor(
    // @InjectModel('user') private userModel: Model<User>,
    private readonly entityManager: EntityManager,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Passwords)
    private passwordRepository: Repository<Passwords>,
    private jwtService: JwtService,
  ) {}

  findAll() {
    // return this.userModel.find().exec();
    return '';
  }

  async findOne(token: string) {
    const user = await this.jwtService.decode(token);
    const resUser = await this.userRepository.findOne({
      where: {
        email: user?.['email'],
      },
    });
    return resUser;
  }
  async findOnWithUsername(username: string) {
    // return this.userModel.findOne({ username }).exec();
    return '';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
