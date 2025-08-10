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
            const foundUser = await this.userService.findUser(userId);
            const newList = this.todoRepository.create({ title: newListDto.title, user: foundUser });
            const {user, ...restOfNewList} = await this.todoRepository.save(newList);
            return restOfNewList;
        } catch(err) {
            throw err;
        }
    }

    async getAll(userId: number) {
        try {
            const foundUser = await this.userService.findUser(userId);
            const allLists = await this.todoRepository.findBy({ user: foundUser });
            return allLists;
        } catch(err) {
            throw err;
        }
    }

    async getList(userId: number, todoId: number) {
        try {
            const foundUser = await this.userService.findUser(userId);
            const todoList = await this.todoRepository.findOneBy({ id: todoId, user: foundUser });
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
            const foundUser = await this.userService.findUser(userId);
            const todoList = await this.todoRepository.findOneBy({ id: todoId, user: foundUser });
            if(!todoList) {
                throw new NotFoundException('Todo list not found');
            }
            todoList.title = updateListDto.title;
            return await this.todoRepository.save(todoList);
            //return this.todoRepository.update({ id: todoId, user: user }, {...newListDto});
        } catch(err) {
            throw err;
        }
    }

    async deleteList(userId: number, todoId: number) {
        try {
            const foundUser = await this.userService.findUser(userId);
            const todoList = await this.todoRepository.findOneBy({ id: todoId, user: foundUser });
            if(!todoList) {
                throw new NotFoundException('Todo list not found');
            }
            return await this.todoRepository.remove(todoList);
        } catch(err) {
            throw err;
        }
    }
}