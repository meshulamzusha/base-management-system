import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, shiftId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not exist`)
    }

    const shift = await this.prisma.shift.findUnique({
      where: {id: shiftId},
    })

    if (!shift) {
      throw new NotFoundException(`Shift with id ${shiftId} not exist`)
    }

    return this.prisma.assignment.create({
      data: {
        userId: userId,
        shiftId: shiftId
      }
    })
  }

  findAll() {
    const user = this.prisma.assignment.findMany({
      include: { user: true, shift: true}
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} assignment`;
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
