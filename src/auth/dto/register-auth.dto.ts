import { Length, IsEmail, IsString } from 'class-validator';
import { Gender } from 'src/user/entities/users.entity';

export class RegisterFormDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 16)
  password: string;

  @IsString()
  gender: Gender;
}
