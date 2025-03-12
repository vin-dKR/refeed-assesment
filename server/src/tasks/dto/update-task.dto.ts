import { IsNotEmpty, IsEnum, IsOptional } from "class-validator"

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsOptional()
    title?: string;

    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @IsEnum(['pending', 'in-progress', 'completed'])
    @IsOptional()
    status?: string;
}
