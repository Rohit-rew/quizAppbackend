import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin';
import { AdminController } from './admin.controller';
import { AdminRepository } from './adminAuth.repository';
import { AdminRegister, AdminSchema } from './schema/adminAuth.schema';

@Module({
    imports:[MongooseModule.forFeature([{name : AdminRegister.name , schema : AdminSchema}])],
    controllers : [AdminController],
    providers : [AdminRepository , AdminService]
})
export class AdminModule {}
