import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import AdminQuizService from 'src/admin/admin';
import { AdminQuizModule } from 'src/admin/admin.module';
import { AdminQuizrepo } from 'src/admin/AdminQuiz.repository';
import AdminQuiz, { AdminQuizSchema } from 'src/admin/schema/adminQuiz.schema';
import { AdminService } from './admin';
import { AdminController } from './admin.controller';
import { AdminRepository } from './adminAuth.repository';
import { AdminRegister, AdminSchema } from './schema/adminAuth.schema';

@Module({
    imports:[MongooseModule.forFeature([{name : AdminRegister.name , schema : AdminSchema}]) ,

    MongooseModule.forFeature([{name: AdminQuiz.name , schema : AdminQuizSchema}])
],
    controllers : [AdminController],
    providers : [AdminRepository , AdminService , AdminQuizService , AdminQuizrepo , JwtService ]
})
export class AdminModule {}
