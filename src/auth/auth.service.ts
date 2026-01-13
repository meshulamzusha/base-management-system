import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  private users: any[] = [];
  constructor(private jwtService: JwtService) { }

  async register(dto: RegisterDto) {
    const exists = this.users.find(u => u.email === dto.email);
    if (exists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = {
      id: Date.now(),
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    };

    this.users.push(user);

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });

    return { access_token: token };
  }

  async login(dto: LoginDto) {
    const user = this.users.find(u => u.email === dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });

    return { access_token: token };
  }

}