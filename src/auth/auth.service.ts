import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInDto } from "src/dto/user-signin.dto";
import { SignUpDto } from "src/dto/user-signup.dto";
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ActiveUserData } from "./active-user-data.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    async signUp(signUpDto: SignUpDto) {
        try {
            const salt: string = await genSalt();
            const hashedPassword = await hash(signUpDto.password, salt);
            await this.userService.createUser(signUpDto.username, hashedPassword);
            return "Successful";
        } catch(err) {
            const pgUniqueErrorViolationCode = '23505';
            if (err.code === pgUniqueErrorViolationCode) {
                throw new ConflictException('Username already exists');
            }
            throw err; 
        }
    }

    async signIn(signInDto: SignInDto) {
        try {
            const user = await this.userService.findUsername(signInDto.username);
            if (!user) {
                throw new UnauthorizedException('Invalid username or password');
            }
            const isEqual: boolean = await compare(signInDto.password, user.password);
            if (!isEqual) {
                throw new UnauthorizedException('Invalid username or password');
            }

            const accessToken = await this.jwtService.signAsync(
                {
                    sub: user.id,
                    username: user.username,
                } as ActiveUserData,
                {
                    audience: this.configService.get<string>('JWT_TOKEN_AUDIENCE'),
                    issuer: this.configService.get<string>('JWT_TOKEN_ISSUER'),
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_TTL'),
                },
            );
            return { accessToken };
        } catch(err) {
            throw err;
        }
    }
}