import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRegister, UserSchema } from './schema/userAuth.schema';
import { UserService } from './user';
import { UserController } from './user.controller';

@Module({
    imports:[MongooseModule.forFeature([{name : UserRegister.name , schema : UserSchema}])],
    controllers : [UserController],
    providers : [UserService]
})
export class UserModule {}
