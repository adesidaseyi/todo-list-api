import { IsAlphanumeric, IsDefined, IsLowercase, IsNotEmpty, IsString, IsStrongPassword, MinLength, MaxLength } from 'class-validator';

export class SignInDto {
    @IsString({ message: 'Username must be a string' })
    @IsDefined({ message: 'Username is required' })
    @IsNotEmpty({ message: 'Username cannot be empty' })
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    @MaxLength(20, { message: 'Username cannot exceed 20 characters' })
    @IsAlphanumeric()
    @IsLowercase({ message: 'Username must be in lower case' })
    username: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;
}