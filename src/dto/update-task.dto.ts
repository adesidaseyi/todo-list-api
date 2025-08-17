import { IsDefined, IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { TaskStatus } from "src/entities/task.entity";

export class UpdateTaskDto {
    @IsOptional()
    @IsString({ message: 'Task description must be a string' })
    @IsDefined({ message: 'Task description is required' })
    @IsNotEmpty({ message: 'Task description cannot be empty' })
    @MaxLength(100, { message: 'Task description cannot exceed 100 characters' })
    description?: string;

    @IsOptional()
    @IsDefined({ message: 'Task due date is required' })
    @IsNotEmpty({ message: 'Task due date cannot be empty' })
    @IsISO8601({ strict: false, strictSeparator: false }, { message: 'Task due date must be of ISO8601 string format' })
    dueDate?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}