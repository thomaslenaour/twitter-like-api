import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserRepository } from './user.repository';

import { getAge } from './utils/user.utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(where: 'id' | 'pseudo' | 'email', value: string) {
    const user = await this.userRepository.getUser(where, value);

    if (!user) {
      throw new NotFoundException(
        `Cannot find user where ${where} is equal to ${value}`,
      );
    }

    return user;
  }

  async createUser(data: CreateUserDto) {
    if (getAge(data.birthDate) < 15) {
      throw new Error('You must have 15 years to register.');
    }

    data.password = await bcrypt.hash(data.password, 10);

    return this.userRepository.createUser(data);
  }

  async updateUser(data: UpdateUserDto) {
    const { userId, ...newData } = data;

    return this.userRepository.updateUser(userId, newData);
  }
}
