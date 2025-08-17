import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewTaskDto } from "src/dto/new-task.dto";
import { UpdateTaskDto } from "src/dto/update-task.dto";
import { Task } from "src/entities/task.entity";
import { TodoService } from "src/todo/todo.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        private readonly todoService: TodoService,
        private readonly userService: UserService,
    ) {}

    async createTask(userId: number, newTaskDto: NewTaskDto) {
        try {           
            const { todoId, ...restOfNewTaskDto } = newTaskDto;
            const foundUser = await this.userService.findUserId(userId);
            const foundTodo = await this.todoService.getList(userId, todoId);
            const newTask = this.taskRepository.create({ ...restOfNewTaskDto, todo: foundTodo, user: foundUser });
            const {user, ...restOfNewTask} = await this.taskRepository.save(newTask);
            return restOfNewTask;
        } catch(err) {
            throw err;
        }
    }

    async getAll(userId: number) {
        return await this.taskRepository.find({ 
            where: { user: { id: userId } }, 
            relations:{ todo: true } 
        });
    }

    async getTask(userId: number, taskId: number) {
        try {
            const task = await this.taskRepository.findOne({ 
                where: { id: taskId, user: { id: userId } },
                relations: { todo: true }
            });
            if(!task) {
                throw new NotFoundException('Task not found');
            }
            return task;
        } catch(err) {
            throw err;
        }
    }

    async updateTask(userId: number, taskId: number, updateTaskDto: UpdateTaskDto) {
        try {
            const task = await this.getTask(userId, taskId);
            for (const key in updateTaskDto) {
                if (updateTaskDto[key] !== undefined) {
                    task[key] = updateTaskDto[key];
                }
            }
            return await this.taskRepository.save(task);
        } catch(err) {
            throw err;
        }
    }

    async softDeleteTask(userId: number, taskId: number) {
        try {
            const task = await this.getTask(userId, taskId);
            return await this.taskRepository.softRemove(task);
        } catch(err) {
            throw err;
        }
    }
}