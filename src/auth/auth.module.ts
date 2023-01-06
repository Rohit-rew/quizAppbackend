import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin';
import { User } from './user/user';
import { AdminModule } from './admin/admin.module';
import { AdminRepository } from './admin/adminAuth.repository';

@Module({
  imports: [AdminModule],
  controllers: [],
  providers: []
})
export class AuthModule {}
