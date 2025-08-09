import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Task } from "./task.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    dateCreated: Date;

    @OneToMany(() => Task, (task) => task.todo)
    tasks: Task[];
    
    @ManyToOne(() => User, (user) => user.todoLists)
    user: User;
}