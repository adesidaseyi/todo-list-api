import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { TaskService } from "./task.service";
import { ActiveUser } from "src/auth/active-user.decorator";
import { NewTaskDto } from "src/dto/new-task.dto";
import { UpdateTaskDto } from "src/dto/update-task.dto";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post('new')
    createTask(@ActiveUser('sub') userId: number, @Body() newTaskDto: NewTaskDto) {
        return this.taskService.createTask(userId, newTaskDto);
    }

    @Get('all') // add pagination and sorting parameters
    getAll(@ActiveUser('sub') userId: number) {
        return this.taskService.getAll(userId);
    }

    @Get(':id')
    getTask(@ActiveUser('sub') userId: number, @Param('id') taskId: number) {
        return this.taskService.getTask(userId, taskId);
    }

    @Patch(':id')
    updateTask(@ActiveUser('sub') userId: number, @Param('id') taskId: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.updateTask(userId, taskId, updateTaskDto);
    }

    @Delete(':id')
    deleteTask(@ActiveUser('sub') userId: number, @Param('id') taskId: number) {
        return this.taskService.softDeleteTask(userId, taskId);
    }

}