import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "src/entities/todo.entity";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Todo]), UserModule],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule {}