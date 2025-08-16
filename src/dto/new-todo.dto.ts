import { IsAlpha, IsDefined, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class NewTodoDto {
    @IsDefined({ message: 'Title is required' })
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    @MaxLength(30, { message: 'Title cannot exceed 30 characters' })
    title: string;
}