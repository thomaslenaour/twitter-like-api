import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/create-user.input';
import { GetUserWhereInput } from './dto/get-user.input';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(where: GetUserWhereInput, value: string) {
    return this.userRepository.getUser(where, value);
  }

  async createUser(data: CreateUserInput) {
    if (this.getAge(data.birthDate) < 15) {
      throw new Error('You must have 15 years to register.');
    }

    data.password = await bcrypt.hash(data.password, 10);

    return this.userRepository.createUser(data);
  }

  getAge(birthday: Date) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
