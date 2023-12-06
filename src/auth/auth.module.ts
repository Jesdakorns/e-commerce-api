import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { JWTStrategy } from './strategies/jwt-strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken-strategy';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, Passwords } from 'src/user/entities';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_KEY}`,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([Users, Passwords]),
  ],
  controllers: [AuthController],
  providers: [
    UserModule,
    AuthService,
    UserService,
    JWTStrategy,
    LocalStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
