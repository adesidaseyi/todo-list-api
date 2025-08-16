import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { 
                expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
                audience: process.env.JWT_TOKEN_AUDIENCE,
                issuer: process.env.JWT_TOKEN_ISSUER,
            },
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}