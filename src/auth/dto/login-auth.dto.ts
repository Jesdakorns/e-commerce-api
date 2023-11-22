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
  id: string;
  name: string;
  email: string;
  image: string;
}
