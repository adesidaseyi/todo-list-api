import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./todo.entity";
import { Task } from "./task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Todo, (todo) => todo.user)
    todoLists: Todo[];
    
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}