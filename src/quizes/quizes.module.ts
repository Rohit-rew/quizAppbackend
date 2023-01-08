import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AllQuizesRepo } from './allQuizes.reposotory';
import { QuizesService } from './quizes';
import { QuizesController } from './quizes.controller';
import AllQuizes, { AllQuizesSchema } from './schema/allQuizes.schema';

@Module({
    imports : [MongooseModule.forFeature([{name: AllQuizes.name , schema : AllQuizesSchema}])],
    controllers:[QuizesController],
    providers: [QuizesService , AllQuizesRepo]
})
export class QuizesModule {}
