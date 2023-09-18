import { Module } from '@nestjs/common';
import { AuthController } from './auth/adapters/primary/auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthRepository } from './auth/repositories/auth.repository';
import { AuthService } from './auth/adapters/secondary/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthRepository, AuthService],
})
export class UserModule {}
