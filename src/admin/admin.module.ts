import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import AdminQuizService from './admin';
import { AdminQuizrepo } from './AdminQuiz.repository';
import { MongooseModule } from '@nestjs/mongoose';
import AdminQuiz, { AdminQuizSchema } from './schema/adminQuiz.schema';
import { AdminSchema } from 'src/auth/admin/schema/adminAuth.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name: AdminQuiz.name , schema : AdminQuizSchema}])],
  controllers: [AdminController],
  providers: [AdminQuizService , AdminQuizrepo , JwtService]
})
export class AdminQuizModule {}
