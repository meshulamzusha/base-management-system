import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '../generated/prisma/client.js';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    if (exists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      },
    });

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });

    return { access_token: token };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })

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