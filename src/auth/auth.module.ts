import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AdminController } from './admin/admin.controller';
import { Admin } from './admin/admin';
import { User } from './user/user';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminLogin, AdminSchema } from './schema/admin.schema';

@Module({
  imports: [MongooseModule.forFeature([{name : AdminLogin.name , schema : AdminSchema}])],
  controllers: [ UserController, AdminController],
  providers: [ Admin, User]
})
export class AuthModule {}
