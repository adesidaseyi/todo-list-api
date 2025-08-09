import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "src/dto/user-signup.dto";
import { SignInDto } from "src/dto/user-signin.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }
}