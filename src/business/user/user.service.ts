import { Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtDecodedUser } from 'src/technical/auth/types/jwt.interface';

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

  async searchUser(searchValue: string) {
    return await this.userRepository.searchUser(searchValue);
  }

  async createUser(data: CreateUserDto) {
    if (getAge(data.birthDate) < 15) {
      throw new Error('You must have 15 years to register.');
    }

    return this.userRepository.createUser(data);
  }

  async updateUser(data: UpdateUserDto) {
    return this.userRepository.updateUser(data);
  }

  async getCompatibleUsersList(user: JwtDecodedUser) {
    return await this.userRepository.getCompatibleUsersList(user);
  }

  async getUserCentersOfInterest(userId: string) {
    return await this.userRepository.getUserCentersOfInterest(userId);
  }
}
