import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewTodoDto } from "src/dto/new-todo.dto";
import { UpdateTodoDto } from "src/dto/update-todo.dto";
import { Todo } from "src/entities/todo.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    ) {}

    async createList(userId: number, newListDto: NewTodoDto) {
        try {
            const foundUser = await this.userService.findUserId(userId);
            const newList = this.todoRepository.create({ title: newListDto.title, user: foundUser });
            const {user, ...restOfNewList} = await this.todoRepository.save(newList);
            return restOfNewList;
        } catch(err) {
            throw err;
        }
    }

    async getAll(userId: number) {
        const allLists = await this.todoRepository.findBy({ user: {id: userId} });
        return allLists;
    }

    async getList(userId: number, todoId: number) {
        try {
            const todoList = await this.todoRepository.findOneBy({ id: todoId, user: { id: userId } });
            if(!todoList) {
                throw new NotFoundException('Todo list not found');
            }
            return todoList;
        } catch(err) {
            throw err;
        }
    }

    async updateList(userId: number, todoId: number, updateListDto: UpdateTodoDto) {
        try {
            const todoList = await this.getList(userId, todoId);
            for (const key in updateListDto) {
                if (updateListDto[key] !== undefined) {
                    todoList[key] = updateListDto[key];
                }
            }
            return await this.todoRepository.save(todoList);
        } catch(err) {
            throw err;
        }
    }

    async deleteList(userId: number, todoId: number) {
        try {
            const todoList = await this.getList(userId, todoId);
            return await this.todoRepository.remove(todoList);
        } catch(err) {
            throw err;
        }
    }
}