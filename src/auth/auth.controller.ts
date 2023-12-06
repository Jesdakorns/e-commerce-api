import { UserService } from 'src/user/user.service';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Query,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginFormDto, LoginGoogleFormDto } from './dto/login-auth.dto';
import { LocalGuard } from './guards/local-auth.guard';
import { JWTGuard } from './guards/jwt-auth.guard';
import { RegisterFormDto } from './dto/register-auth.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() createAuthDto: LoginFormDto) {
    console.log(
      `🚀 ~ file: auth.controller.ts ~ line 28 ~ AuthController ~ login ~ createAuthDto`,
      createAuthDto,
    );
    return this.authService.login(createAuthDto);
  }

  @UseGuards(GoogleOauthGuard)
  @Post('login/google')
  async loginGoogle(@Body() createAuthDto: LoginGoogleFormDto) {
    const userInfo = await axios
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${createAuthDto.accessToken}` },
      })
      .then((res) => res.data);
    console.log(
      `🚀 ~ file: auth.controller.ts ~ line 72 ~ AuthController ~ loginGoogle ~ userInfo`,
      userInfo,
    );
    return this.authService.loginGoogle(userInfo);
  }

  @Post('register')
  async register(@Body() registerAuthDto: RegisterFormDto) {
    console.log(
      `🚀 ~ file: auth.controller.ts ~ line 42 ~ AuthController ~ register ~ registerAuthDto`,
      registerAuthDto,
    );
    return this.authService.register(registerAuthDto);
  }

  @UseGuards(JWTGuard)
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(@Req() req) {
    return this.authService.refreshToken(req.body.refresh);
  }

  @UseGuards(JWTGuard)
  @Get('me')
  async user(@Req() req) {
    const token = req?.headers?.authorization?.split('Bearer ')?.[1];
    return this.authService.me(token);
  }
}
