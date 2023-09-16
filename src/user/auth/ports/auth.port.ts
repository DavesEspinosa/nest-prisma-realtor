import { UserType } from '@prisma/client';

export interface IAuthRepository {
  signup(
    { email, password, name, phone }: SignupParams,
    userType: UserType,
  ): Promise<string>;
  signin({ email, password }: SigninParams): Promise<string>;
  generateProductKey(email: string, userType: UserType): Promise<string>;
}
