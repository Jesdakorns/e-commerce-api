import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { EntityManager, Repository } from 'typeorm';
import { Passwords, Users } from './entities';
export declare class UserService {
    private readonly entityManager;
    private userRepository;
    private passwordRepository;
    private jwtService;
    constructor(entityManager: EntityManager, userRepository: Repository<Users>, passwordRepository: Repository<Passwords>, jwtService: JwtService);
    findAll(): string;
    findOne(token: string): Promise<Users>;
    findOnWithUsername(username: string): Promise<string>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
