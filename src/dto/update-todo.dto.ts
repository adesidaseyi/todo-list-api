import { MaxLength } from "class-validator";

export class UpdateTodoDto {
    @MaxLength(30, { message: 'Title cannot exceed 20 characters' })
    title: string;
}