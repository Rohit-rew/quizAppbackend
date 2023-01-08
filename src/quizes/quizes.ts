import { HttpException, HttpStatus, Injectable, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mongoose, { MongooseError } from 'mongoose';
import AdminQuizService from 'src/admin/admin';
import { AllQuizesRepo, quizType } from './allQuizes.reposotory';
import AllQuizes from './schema/allQuizes.schema';

// JWT


@Injectable()
export class QuizesService {
    constructor(private allQuizRepo : AllQuizesRepo , private adminQuizService : AdminQuizService , private jwtService : JwtService){}

    async createQuiz(quizData : quizType , token:string):Promise<string>{

        const decodedToken = await this.jwtService.verify(token , {secret : process.env.JWT_SECRET})
        try {
            // set the name received in headers
            quizData.createdBy = decodedToken.name
            quizData.creatorId = decodedToken.id
            const createdQuiz = await this.allQuizRepo.createQuiz(quizData)
            // if quiz creation successfull add the quiz id to the admin quiz collection quizes array 
            //  call the  AdminQuizRepo.addQuizIdToAdminQuizColl and send the adminId and createdQuiz.id
            // admin id will come from the headers 
            console.log(decodedToken)
            if(createdQuiz){
                await this.adminQuizService.addQuizIdToAdminQuizColl( decodedToken.id , createdQuiz._id.toString())
            }
            return createdQuiz._id
        } catch (error) {
            console.log(error.message)
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


//  admin id : 63baa38092664f0586601936
// quiz id : 63baa3c2f69dfaa576ce4263