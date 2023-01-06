import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AdminController } from './admin/admin.controller';
import { Admin } from './admin/admin';
import { User } from './user/user';

@Module({
  controllers: [ UserController, AdminController],
  providers: [ Admin, User]
})
export class AuthModule {}
