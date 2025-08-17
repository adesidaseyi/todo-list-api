import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => Todo, (todo) => todo.tasks, { nullable: false, onDelete: "CASCADE" })
    todo?: Todo;
    
    @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
    user?: User;
}