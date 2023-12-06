import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from 'src/schema/user.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, Passwords } from './entities';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    TypeOrmModule.forFeature([Users, Passwords]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
