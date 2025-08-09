import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Todo } from "./todo.entity";

export enum TaskStatus {
    PENDING = "pending",
    COMPLETED = "completed",
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.PENDING,
    })
    status: TaskStatus;

    @Column({ type: "timestamptz" })
    dueDate: Date;

    @CreateDateColumn()
    dateCreated: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => Todo, (todo) => todo.tasks)
    todo: Todo;
    
    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}