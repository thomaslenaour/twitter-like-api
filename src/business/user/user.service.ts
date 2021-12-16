import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/create-user.input';
import { GetUserWhere } from './types/get-user.types';

import { UserRepository } from './user.repository';

import { getAge } from './utils/user.utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(where: GetUserWhere, value: string) {
    return this.userRepository.getUser(where, value);
  }

  async createUser(data: CreateUserInput) {
    if (getAge(data.birthDate) < 15) {
      throw new Error('You must have 15 years to register.');
    }

    data.password = await bcrypt.hash(data.password, 10);

    return this.userRepository.createUser(data);
  }
}
