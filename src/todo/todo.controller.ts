import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { TodoService } from "./todo.service";
import { ActiveUser } from "src/auth/active-user.decorator";
import { NewTodoDto } from "src/dto/new-todo.dto";
import { UpdateTodoDto } from "src/dto/update-todo.dto";

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post('new')
    createList(@ActiveUser('sub') userId: number, @Body() newListDto: NewTodoDto) {
        return this.todoService.createList(userId, newListDto);
    }

    @Get('all') // add pagination and sorting parameters
    getAll(@ActiveUser('sub') userId: number) {
        return this.todoService.getAll(userId);
    }

    @Get(':id')
    getList(@ActiveUser('sub') userId: number, @Param('id') todoId: string) {
        return this.todoService.getList(userId, +todoId);
    }

    @Patch(':id')
    updateList(@ActiveUser('sub') userId: number, @Param('id') todoId: string, @Body() updateListDto: UpdateTodoDto) {
        return this.todoService.updateList(userId, +todoId, updateListDto);
    }

    @Delete(':id')
    deleteList(@ActiveUser('sub') userId: number, @Param('id') todoId: string) {
        return this.todoService.deleteList(userId, +todoId);
    }

}