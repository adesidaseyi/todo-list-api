import { IsDefined, IsInt, IsISO8601, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class NewTaskDto {
    @IsDefined({ message: 'Todo List ID is required' })
    @IsNotEmpty({ message: 'Todo List ID cannot be empty' })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Todo List ID must be a Number' })
    @IsInt({ message: 'Todo List ID must be an Integer' })
    @IsPositive({ message: 'Todo List ID must be a Positive Integer' })
    todoId: number;

    @IsString({ message: 'Task description must be a string' })
    @IsDefined({ message: 'Task description is required' })
    @IsNotEmpty({ message: 'Task description cannot be empty' })
    @MaxLength(100, { message: 'Task description cannot exceed 100 characters' })
    description: string;

    @IsDefined({ message: 'Task due date is required' })
    @IsNotEmpty({ message: 'Task due date cannot be empty' })
    @IsISO8601({ strict: false, strictSeparator: false }, { message: 'Task due date must be of ISO8601 string format' })
    dueDate: string;
}