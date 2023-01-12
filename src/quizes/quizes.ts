import { HttpException, HttpStatus, Injectable, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mongoose, { MongooseError } from 'mongoose';
import AdminQuizService from 'src/admin/admin';
import { AllQuizesRepo } from './allQuizes.reposotory';
import AllQuizes from './schema/allQuizes.schema';

//types
import { quizType } from './types/quiz.type';

@Injectable()
export class QuizesService {
    constructor(private allQuizRepo : AllQuizesRepo , private jwtService : JwtService){}

    async createQuiz(quizData : quizType , token:string):Promise<string>{

        const decodedToken = await this.jwtService.verify(token , {secret : process.env.JWT_SECRET})

        try {
            // set the name received in headers
            quizData.createdBy = decodedToken.name
            quizData.creatorId = decodedToken.id
            const createdQuiz = await this.allQuizRepo.createQuiz(quizData)
            return createdQuiz._id
        } catch (error) {
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST)
        }

    }

    async GetManyById(token : string):Promise<quizType[] | null>{

        const decodedToken = await this.jwtService.verify(token , {secret : process.env.JWT_SECRET})

        try {
            const quizesFound = await this.allQuizRepo.findQuizes(decodedToken.id)
            return quizesFound
        } catch (error) {
            throw new HttpException("invalid id Array provided" , HttpStatus.BAD_REQUEST)
        }
    }

    // => working
    async GetOneById(quizId : string):Promise<AllQuizes>{
        try {
            const quiz = await this.allQuizRepo.findOneById(quizId)
            return quiz
        } catch (error) {
            throw new HttpException("invalid quiz id provided" , HttpStatus.NOT_FOUND)
        }
    }

    async validateAdminJwtToken(token : string):Promise<boolean>{
        try {
            const decodedToken = await this.jwtService.verify(token , {secret : process.env.JWT_SECRET})
            if(!decodedToken.admin) return false
            return true
        } catch (error) {
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE)
        }
    }

    async validateUserJwtToken(token : string):Promise<boolean>{
        try {
            const decodedToken = await this.jwtService.verify(token , {secret : process.env.JWT_SECRET})
            if(!decodedToken) return false
            if(decodedToken.admin) return false
            return true
        } catch (error) {
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE)
        }
    }


}
