import { Injectable } from '@nestjs/common';

import { CreateUserInput } from './dto/create-user.input';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(userId: string) {
    return this.userRepository.getUser(userId);
  }

  async createUser(data: CreateUserInput) {
    if (this.getAge(data.birthDate) < 15) {
      throw new Error('Vous devez avoir 15 ans');
    }

    return this.userRepository.createUser(data);
  }

  getAge(birthday: Date) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
