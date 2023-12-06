import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Passwords, Users } from './entities';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly entityManager: EntityManager,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Passwords)
    private passwordRepository: Repository<Passwords>,
    private jwtService: JwtService,
  ) {}

  async getRedisPromotionSub() {
    const redisPromotionSub: string = await this.cacheManager.get('user');
    return redisPromotionSub;
  }

  async setRedisPromotion(data) {
    await this.cacheManager.set('user', JSON.stringify(data));
  }

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
