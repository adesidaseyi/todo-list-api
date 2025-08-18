import { IsNumber, IsOptional, IsPositive, IsEnum } from "class-validator";

export enum OrderByEnum {
    ASC = "asc",
    DESC = "desc"
}

export class QueryDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    limit?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number;

    @IsOptional()
    @IsEnum(OrderByEnum)
    date_created_order?: OrderByEnum;

    @IsOptional()
    @IsEnum(OrderByEnum)
    due_date_order?: OrderByEnum;
}