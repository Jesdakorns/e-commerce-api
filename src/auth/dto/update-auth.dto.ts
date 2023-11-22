import { PartialType } from '@nestjs/mapped-types';
import { RegisterFormDto } from './register-auth.dto';

export class UpdateAuthDto extends PartialType(RegisterFormDto) {}
