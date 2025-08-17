import { Task } from "src/entities/task.entity";

export enum StatusColour {
    GREEN = "green",
    AMBER = "yellow",
    RED = "red"
}

export interface ColouredTask extends Task{
    statusColour?: StatusColour; // set default value? 
}