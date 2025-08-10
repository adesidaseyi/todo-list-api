import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async findUser(userId: number) {
        try {
            const user = await this.userRepository.findOneBy({ id: userId });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        } catch(err) {
            throw err;
        }
    }
}