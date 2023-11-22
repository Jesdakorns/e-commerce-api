import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
