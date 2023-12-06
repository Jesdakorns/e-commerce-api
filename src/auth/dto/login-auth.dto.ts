import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export interface LoginDTO {
  token: string;
  email: string;
}

export enum Mode {
  GOOGLE = 'google',
}

export class LoginFormDto {
  email: string;
  password: string;
}
export class LoginGoogleFormDto {
  @IsString()
  accessToken: string;

  id: string;
  name: string;
  email: string;
  picture: string;
}
