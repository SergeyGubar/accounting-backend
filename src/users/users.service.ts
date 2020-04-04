import { Injectable } from '@nestjs/common';

export interface User {
  userId: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: '12345',
        username: 'john',
        password: 'changeme',
      },
      {
        userId: '123456',
        username: 'chris',
        password: 'secret',
      },
      {
        userId: '1123123',
        username: 'maria',
        password: 'guess',
      },
      {
        userId: '512354123',
        username: 'sergey',
        password: 'megubar123',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
