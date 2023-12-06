import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_KEY}`,
      // usernameField: 'refresh',
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, email: payload.email };
  }
}
