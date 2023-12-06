import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log(
      `🚀 ~ file: local-strategy.ts ~ line 13 ~ LocalStrategy ~ validate ~ password`,
      password,
    );
    console.log(
      `🚀 ~ file: local-strategy.ts ~ line 13 ~ LocalStrategy ~ validate ~ email`,
      email,
    );
    const user = await this.authService.validateUser(email, password);
    console.log(
      `🚀 ~ file: local-strategy.ts ~ line 22 ~ LocalStrategy ~ validate ~ user`,
      user,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
