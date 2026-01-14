import { IsString, IsNotEmpty } from "class-validator"

export class CreateShiftDto {
    @IsString()
    @IsNotEmpty()
    startTime: string

    @IsString()
    @IsNotEmpty()
    endTime: string

    @IsString()
    @IsNotEmpty()
    location: string
}
