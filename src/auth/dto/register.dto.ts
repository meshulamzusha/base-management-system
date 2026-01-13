import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export enum Role {
  SOLDIER = 'soldier',
  COMMANDER = 'commander',
}

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;
}