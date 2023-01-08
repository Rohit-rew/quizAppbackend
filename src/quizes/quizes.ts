import { Injectable } from '@nestjs/common';
import { AllQuizesRepo, quizType } from './allQuizes.reposotory';

@Injectable()
export class QuizesService {
    constructor(private allQuizRepo : AllQuizesRepo){}

    async createQuiz(quizData : quizType):Promise<string>{
        const createdQuiz = await this.allQuizRepo.createQuiz(quizData)

        return createdQuiz._id
    }

    async GetManyById(idArray : string[]):Promise<quizType[] | null>{
        const quizesFound = await this.allQuizRepo.findQuizes(idArray)

        return quizesFound
    }
}
