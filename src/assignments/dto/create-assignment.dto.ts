import { IsNumber, IsNotEmpty, IsDefined, Min } from "class-validator"

export class CreateAssignmentDto {
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    shiftId: number
}
