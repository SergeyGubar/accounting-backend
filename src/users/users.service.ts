import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../mongo/user.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>,
              private readonly jwtService: JwtService) {
  }

  async insert(createUserDto: CreateUserDto): Promise<User> {
    const user = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    };
    return new Promise((resolve, reject) => {
      this.userModel.create(user, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res[0]);
        }
      });
    });
  }

  // TODO: Here comes the security
  async findOne(email: string, password: string): Promise<{ access_token: string }> {
    return new Promise((resolve, reject) => {
      this.userModel.findOne({ email, password }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const payload = { username: res.name, sub: res._id, email: res.email };
          resolve({
            access_token: this.jwtService.sign(payload),
          });

        }
      });
    });
  }
}
