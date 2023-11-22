import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginFormDto, LoginGoogleFormDto, Mode } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RegisterFormDto } from './dto/register-auth.dto';
import { ResponseModel } from 'src/response/response-model';
import { Passwords, Users } from 'src/user/entities';
import { Provider } from 'src/user/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly userService: UserService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginFormDto) {
    const user = await this.validateUser(email, password);
    console.log(
      `🚀 ~ file: auth.service.ts ~ line 28 ~ AuthService ~ login ~ user`,
      user,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
    return new ResponseModel({
      data: {
        ...payload,
        accessToken: await this.jwtService.sign(payload),
        refreshToken: await this.jwtService.sign(payload, { expiresIn: '14d' }),
      },
    });
  }

  async loginGoogle({ email, name, image }: LoginGoogleFormDto) {
    console.log(
      `🚀 ~ file: auth.service.ts ~ line 46 ~ AuthService ~ loginGoogle ~ { email, name, image }`,
      { email, name, image },
    );
    const user = await this.userRepository.findOneBy({ email });
    console.log(
      `🚀 ~ file: auth.service.ts ~ line 51 ~ AuthService ~ loginGoogle ~ user`,
      user,
    );
    const payload = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      image: user?.image,
    };
    if (!user) {
      const userSave = await this.userRepository.save({
        email,
        name,
        image,
        provider: Provider.GOOGLE,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log(
        `🚀 ~ file: auth.service.ts ~ line 57 ~ AuthService ~ loginGoogle ~ userSave`,
        userSave,
      );
      payload.id = userSave.id;
      payload.name = userSave.name;
      payload.image = userSave.image;
      payload.email = userSave.email;
    }
    return new ResponseModel({
      data: {
        ...payload,
        accessToken: await this.jwtService.sign(payload),
        refreshToken: await this.jwtService.sign(payload, {
          expiresIn: '14d',
        }),
      },
    });
    // const user = await this.validateUser(email, password);
    // console.log(
    //   `🚀 ~ file: auth.service.ts ~ line 28 ~ AuthService ~ login ~ user`,
    //   user,
    // );
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // const payload = { id: user.id, name: user.name, email: user.email };
    // return new ResponseModel({
    //   data: {
    //     ...payload,
    //     accessToken: await this.jwtService.sign(payload),
    //     refreshToken: await this.jwtService.sign(payload, { expiresIn: '14d' }),
    //   },
    // });
  }

  async register({ email, gender, password }: RegisterFormDto) {
    const hashEmail = await this.hashEmail(email);

    if (hashEmail) {
      throw new BadRequestException('Email is already in use.');
    }
    const hashPassword = bcrypt.hashSync(password, Number(10));
    const resUser = await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const resPassword = await transactionalEntityManager
          .createQueryBuilder()
          .insert()
          .into(Passwords)
          .values({
            password: hashPassword,
          })
          .execute();
        const res = await transactionalEntityManager
          .createQueryBuilder()
          .insert()
          .into(Users)
          .values({
            email,
            gender,
            created_at: new Date(),
            updated_at: new Date(),
            password: resPassword?.raw?.[0]?.id,
          })
          .returning(['email', 'gender', 'created_at', 'updated_at'])
          .execute();
        return res?.generatedMaps?.[0];
      },
    );

    return new ResponseModel({ data: resUser });
  }

  async googleAuth({ id, name, email }: LoginGoogleFormDto) {
    console.log({ id, name, email });

    const payload = { id: id, name: name, email: email };
    return new ResponseModel({
      data: {
        ...payload,
        accessToken: await this.jwtService.sign(payload),
        refreshToken: await this.jwtService.sign(payload, { expiresIn: '14d' }),
      },
    });
  }

  async refreshToken(token: string) {
    const user = await this.jwtService.decode(token);
    const payload = { sub: user?.['id'], email: user?.['email'] };
    return new ResponseModel({
      data: {
        accessToken: await this.jwtService.sign(payload),
      },
    });
  }

  async me(token: string) {
    const user = await this.jwtService.decode(token);
    const resUser = await this.userRepository.findOne({
      where: {
        email: user?.['email'],
      },
    });
    if (!resUser) {
      throw new UnauthorizedException();
    }
    return new ResponseModel({ data: resUser });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.password', 'password')
      .where({
        email,
      })
      .getOne();
    const isPassword = await bcrypt.compare(
      password,
      user?.password?.password || '',
    );
    if (!isPassword) {
      return null;
    }
    return user;
  }

  async hashEmail(email) {
    const hashEmail = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return hashEmail;
  }
}
