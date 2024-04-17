import { UserService } from './users.service';
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    this.logger.log('Get all users');
    const users = await this.userService.findAll();
    users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }

  @Get('/:page')
  async getPartUsers(@Param('page') page: number) {
    this.logger.log('Get only part users');
    const users = await this.userService.findAll();
    const countUsersPage = 20;
    const partUsers = users.filter((user, index) => {
      if (index >= countUsersPage * (page - 1) && index < countUsersPage * page) {
        return user;
      }
    });
    return { users: partUsers.map((user) => UsersResponseDto.fromUsersEntity(user)), countUsers: users.length };
  }
}
