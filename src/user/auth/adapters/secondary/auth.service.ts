import { Injectable } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { IAuthRepository } from '../../ports/auth.port';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable()
export class AuthService implements IAuthRepository {
  constructor(private readonly authRepository: AuthRepository) {}
  async signup(
    { email, password, name, phone }: SignupParams,
    userType: UserType,
  ) {
    return this.authRepository.signup(
      { email, password, name, phone },
      userType,
    );
  }

  async signin({ email, password }: SigninParams) {
    return this.authRepository.signin({ email, password });
  }

  generateProductKey(email: string, userType: UserType) {
    return this.authRepository.generateProductKey(email, userType);
  }
}
