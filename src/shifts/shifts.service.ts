import { Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ShiftsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShiftDto: CreateShiftDto) {
    return await this.prisma.shift.create({
      data: {
        startTime: createShiftDto.startTime,
        endTime: createShiftDto.endTime,
        location: createShiftDto.location
      }
    })
  }

  findAll() {
    return `This action returns all shifts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shift`;
  }

  update(id: number, updateShiftDto: UpdateShiftDto) {
    return `This action updates a #${id} shift`;
  }

  remove(id: number) {
    ;
  }
}
