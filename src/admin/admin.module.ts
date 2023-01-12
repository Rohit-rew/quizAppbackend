import { Module } from '@nestjs/common';
import AdminQuizService from './admin';
import { AdminQuizrepo } from './AdminQuiz.repository';
import { MongooseModule } from '@nestjs/mongoose';
import AdminQuiz, { AdminQuizSchema } from './schema/adminQuiz.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name: AdminQuiz.name , schema : AdminQuizSchema}])],
  providers: [AdminQuizService , AdminQuizrepo , JwtService]
})
export class AdminQuizModule {}
