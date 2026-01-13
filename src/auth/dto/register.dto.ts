import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from 'src/generated/prisma/enums';

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