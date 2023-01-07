/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRegister, UserSchema } from './schema/userAuth.schema';
import { UserService } from './user';
import { UserController } from './user.controller';
import { UserRepository } from './userAuth.repository';

@Module({
    imports:[MongooseModule.forFeature([{name : UserRegister.name , schema : UserSchema}])],
    controllers : [UserController],
    providers : [UserService , UserRepository , JwtService]
})
export class UserModule {}
