import { HttpException, HttpStatus, Injectable, ValidationPipe } from '@nestjs/common';
import mongoose, { MongooseError } from 'mongoose';
import { AllQuizesRepo, quizType } from './allQuizes.reposotory';

@Injectable()
export class QuizesService {
    constructor(private allQuizRepo : AllQuizesRepo){}

    async createQuiz(quizData : quizType):Promise<string>{

        try {
            const createdQuiz = await this.allQuizRepo.createQuiz(quizData)
            return createdQuiz._id
    
        } catch (error) {
            console.log(error.message)
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST)
        }

    }

    async GetManyById(idArray : string[]):Promise<quizType[] | null>{

        try {
            const quizesFound = await this.allQuizRepo.findQuizes(idArray)
            return quizesFound
        } catch (error) {
            throw new HttpException("invalid id Array provided" , HttpStatus.BAD_REQUEST)
        }
    }
}
