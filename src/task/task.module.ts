import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/entities/task.entity";
import { UserModule } from "src/user/user.module";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { TodoModule } from "src/todo/todo.module";

@Module({
    imports: [TypeOrmModule.forFeature([Task]), TodoModule, UserModule],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}