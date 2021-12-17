import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

import { BcryptConfig } from 'config/config.interface';

@Injectable()
export class PasswordService {
  private bcryptConfig: BcryptConfig;

  constructor(private configService: ConfigService) {
    this.bcryptConfig = this.configService.get('auth.bcrypt');
  }

  get bcryptSaltOrRounds(): string | number {
    const saltOrRounds = this.bcryptConfig.bcryptSaltOrRound;

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds;
  }

  hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltOrRounds);
  }

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
