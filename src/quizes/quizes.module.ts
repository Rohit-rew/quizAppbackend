import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import AdminQuizService from 'src/admin/admin';
import { AdminQuizrepo } from 'src/admin/AdminQuiz.repository';
import AdminQuiz, { AdminQuizSchema } from 'src/admin/schema/adminQuiz.schema';
import { AllQuizesRepo } from './allQuizes.reposotory';
import { QuizesService } from './quizes';
import { QuizesController } from './quizes.controller';
import AllQuizes, { AllQuizesSchema } from './schema/allQuizes.schema';

@Module({
    imports : [MongooseModule.forFeature([{name: AllQuizes.name , schema : AllQuizesSchema}]) ,
    MongooseModule.forFeature([{name: AdminQuiz.name , schema : AdminQuizSchema}])
],
    controllers:[QuizesController],
    providers: [QuizesService , AllQuizesRepo , AdminQuizService , AdminQuizrepo , JwtService]
})
export class QuizesModule {}
