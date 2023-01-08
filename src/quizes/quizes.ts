import { HttpException, HttpStatus, Injectable, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mongoose, { MongooseError } from 'mongoose';
import AdminQuizService from 'src/admin/admin';
import { AllQuizesRepo, quizType } from './allQuizes.reposotory';

// JWT


@Injectable()
export class QuizesService {
    constructor(private allQuizRepo : AllQuizesRepo , private adminQuizService : AdminQuizService , private jwtService : JwtService){}

    async createQuiz(quizData : quizType):Promise<string>{

        try {
            const createdQuiz = await this.allQuizRepo.createQuiz(quizData)
            // if quiz creation successfull add the quiz id to the admin quiz collection quizes array 
            //  call the  AdminQuizRepo.addQuizIdToAdminQuizColl and send the adminId and createdQuiz.id
            // admin id will come from the headers 
            if(createdQuiz){
                await this.adminQuizService.addQuizIdToAdminQuizColl( "provide adminid here" , createdQuiz._id)
            }
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

    async validateJwtToken(token : string):Promise<boolean>{
        try {
            const decodedToken = await this.jwtService.verify(token , {secret : process.env.JWT_SECRET})
            if(!decodedToken.admin) return false
            return true
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE)
        }
    }
}


//  admin id : 63baa38092664f0586601936
// quiz id : 63baa3c2f69dfaa576ce4263