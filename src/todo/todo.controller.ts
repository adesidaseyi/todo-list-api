import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { TodoService } from "./todo.service";
import { ActiveUser } from "src/auth/active-user.decorator";
import { NewTodoDto } from "src/dto/new-todo.dto";
import { UpdateTodoDto } from "src/dto/update-todo.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { QueryDto } from "src/dto/query.dto";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post('new')
    createList(@ActiveUser('sub') userId: number, @Body() newListDto: NewTodoDto) {
        return this.todoService.createList(userId, newListDto);
    }

    @Get('all')
    getAll(@ActiveUser('sub') userId: number, @Query() queryDto: QueryDto) {
        return this.todoService.getAll(userId, queryDto);
    }

    @Get(':id')
    getList(@ActiveUser('sub') userId: number, @Param('id') todoId: number) {
        return this.todoService.getList(userId, todoId);
    }

    @Patch(':id')
    updateList(@ActiveUser('sub') userId: number, @Param('id') todoId: number, @Body() updateListDto: UpdateTodoDto) {
        return this.todoService.updateList(userId, todoId, updateListDto);
    }

    @Delete(':id')
    deleteList(@ActiveUser('sub') userId: number, @Param('id') todoId: number) {
        return this.todoService.deleteList(userId, todoId);
    }

}